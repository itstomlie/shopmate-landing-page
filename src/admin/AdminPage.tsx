import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import LoginForm from "./LoginForm";
import ReceiptDetail from "./ReceiptDetail";
import type { AdminReceipt, AdminUserOverview } from "./types";
import { formatDate, formatMoney, userLabel } from "./types";
import "./admin.css";

type Gate = "checking" | "signed-out" | "denied" | "admin";

const AdminPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [gate, setGate] = useState<Gate>("checking");
  const [users, setUsers] = useState<AdminUserOverview[]>([]);
  const [receipts, setReceipts] = useState<AdminReceipt[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (!data.session) setGate("signed-out");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession) setGate("signed-out");
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Role gate: RLS lets any user read only their own profile row.
  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    // Show a spinner while the async role check runs against a fresh session.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGate("checking");
    void supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        // Keep the session so the denial message persists — signing out here
        // would flip the gate straight back to "signed-out" and hide it. RLS
        // still blocks all other users' data regardless.
        if (error || data?.role !== "admin") setGate("denied");
        else setGate("admin");
      });
    return () => {
      cancelled = true;
    };
  }, [session]);

  const loadData = useCallback(async () => {
    setLoadError(null);
    const [overview, receiptRows] = await Promise.all([
      supabase.rpc("admin_users_overview"),
      supabase
        .from("receipts")
        .select(
          "id, user_id, purchase_date, total_amount, currency, status, review_status, image_path, created_at, store:stores(branch_name, chain:store_chains(name))",
        )
        .order("created_at", { ascending: false }),
    ]);
    if (overview.error) {
      setLoadError(overview.error.message);
      return;
    }
    if (receiptRows.error) {
      setLoadError(receiptRows.error.message);
      return;
    }
    setUsers((overview.data ?? []) as AdminUserOverview[]);
    setReceipts((receiptRows.data ?? []) as unknown as AdminReceipt[]);
  }, []);

  useEffect(() => {
    // Fetch admin data once the gate opens; loadData resets its own error state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (gate === "admin") void loadData();
  }, [gate, loadData]);

  const receiptsByUser = useMemo(() => {
    const map = new Map<string, AdminReceipt[]>();
    for (const r of receipts) {
      const list = map.get(r.user_id) ?? [];
      list.push(r);
      map.set(r.user_id, list);
    }
    return map;
  }, [receipts]);

  // Users with receipts first (most recent activity on top), empty users last.
  const sortedUsers = useMemo(
    () =>
      [...users].sort((a, b) => {
        if (!!a.last_receipt_at !== !!b.last_receipt_at) return a.last_receipt_at ? -1 : 1;
        return (b.last_receipt_at ?? "").localeCompare(a.last_receipt_at ?? "");
      }),
    [users],
  );

  const selectedReceipt = receipts.find((r) => r.id === selectedId) ?? null;
  const selectedOwner = selectedReceipt
    ? users.find((u) => u.user_id === selectedReceipt.user_id)
    : undefined;

  const handleReceiptChanged = (updated: AdminReceipt) => {
    setReceipts((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    // Status counts changed; refresh the overview numbers in the background.
    void supabase.rpc("admin_users_overview").then(({ data, error }) => {
      if (!error && data) setUsers(data as AdminUserOverview[]);
    });
  };

  if (gate === "denied") {
    return (
      <div className="admin-root">
        <div className="admin-login">
          <div className="admin-login-card">
            <h1 className="admin-login-title">No admin access</h1>
            <p className="admin-login-subtitle">
              {session?.user.email} is not an admin account. Ask an administrator for access, or
              sign in with a different account.
            </p>
            <button
              className="btn-primary admin-login-btn"
              onClick={() => void supabase.auth.signOut()}
            >
              Sign in with another account
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gate === "signed-out") {
    return (
      <div className="admin-root">
        <LoginForm />
      </div>
    );
  }

  if (gate === "checking") {
    return (
      <div className="admin-root">
        <p className="admin-muted admin-centered">Checking access…</p>
      </div>
    );
  }

  return (
    <div className="admin-root">
      <header className="admin-header">
        <span className="admin-logo">Shopmate Admin</span>
        <div className="admin-header-right">
          <span className="admin-muted">{session?.user.email}</span>
          <button className="btn-signout" onClick={() => void supabase.auth.signOut()}>
            Sign out
          </button>
        </div>
      </header>

      {loadError && <p className="admin-error">{loadError}</p>}

      <div className="admin-layout">
        <aside className="admin-sidebar">
          {sortedUsers.map((u) => {
            const userReceipts = receiptsByUser.get(u.user_id) ?? [];
            const isOpen = expanded[u.user_id] ?? false;
            return (
              <div key={u.user_id} className="user-group">
                <button
                  className="user-group-header"
                  onClick={() =>
                    setExpanded((prev) => ({ ...prev, [u.user_id]: !isOpen }))
                  }
                >
                  <span className="user-group-caret">{isOpen ? "▾" : "▸"}</span>
                  <span className="user-group-name">{userLabel(u)}</span>
                  <span className="user-group-counts">
                    {u.submitted_count > 0 && (
                      <span className="count-chip count-submitted">{u.submitted_count}</span>
                    )}
                    {u.verified_count > 0 && (
                      <span className="count-chip count-verified">{u.verified_count}</span>
                    )}
                    {u.rejected_count > 0 && (
                      <span className="count-chip count-rejected">{u.rejected_count}</span>
                    )}
                    <span className="count-chip count-total">{u.receipt_count}</span>
                  </span>
                </button>
                {isOpen && (
                  <ul className="user-receipts">
                    {userReceipts.length === 0 && (
                      <li className="admin-muted user-receipts-empty">No receipts</li>
                    )}
                    {userReceipts.map((r) => (
                      <li key={r.id}>
                        <button
                          className={`receipt-row ${selectedId === r.id ? "selected" : ""}`}
                          onClick={() => setSelectedId(r.id)}
                        >
                          <span className={`status-dot status-${r.review_status}`} />
                          <span className="receipt-row-main">
                            <span className="receipt-row-store">
                              {r.store?.chain?.name || r.store?.branch_name || "Unknown store"}
                            </span>
                            <span className="receipt-row-date">
                              {formatDate(r.purchase_date ?? r.created_at)}
                            </span>
                          </span>
                          <span className="receipt-row-total">
                            {formatMoney(r.total_amount, r.currency)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </aside>

        <main className="admin-main">
          {selectedReceipt ? (
            <ReceiptDetail
              key={selectedReceipt.id}
              receipt={selectedReceipt}
              ownerLabel={selectedOwner ? userLabel(selectedOwner) : "Unknown user"}
              onReceiptChanged={handleReceiptChanged}
            />
          ) : (
            <p className="admin-muted admin-centered">
              Select a receipt from the list to review it.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
