import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { AdminLineItem, AdminReceipt, ReviewStatus } from "./types";
import { formatDate, formatMoney } from "./types";
import { formatPricePerUnit } from "./pricePerUnit";

interface Props {
  receipt: AdminReceipt;
  ownerLabel: string;
  onReceiptChanged: (updated: AdminReceipt) => void;
}

// Paths are stored bucket-prefixed ("receipts/<userId>/x.jpg"); the storage
// client signs by object key within the bucket.
const toObjectKey = (path: string) => path.replace(/^receipts\//, "");

// $/unit is derived, never edited — so it is not part of the draft.
interface ItemDraft {
  raw_name: string;
  price: string;
  quantity: string;
  unit: string;
}

const toDraft = (item: AdminLineItem): ItemDraft => ({
  raw_name: item.raw_name ?? "",
  price: item.price != null ? String(item.price) : "",
  quantity: item.quantity != null ? String(item.quantity) : "",
  unit: item.unit ?? "",
});

const numOrNull = (s: string): number | null => {
  const trimmed = s.trim();
  if (!trimmed) return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
};

const storeLabel = (receipt: AdminReceipt): string => {
  const chain = receipt.store?.chain?.name;
  const branch = receipt.store?.branch_name;
  if (chain && branch) return `${chain} — ${branch}`;
  return chain || branch || "Unknown store";
};

const ReceiptDetail: React.FC<Props> = ({ receipt, ownerLabel, onReceiptChanged }) => {
  const [items, setItems] = useState<AdminLineItem[]>([]);
  const [drafts, setDrafts] = useState<Record<string, ItemDraft>>({});
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusBusy, setStatusBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    setNotice(null);
    const { data, error: itemsError } = await supabase
      .from("line_items")
      .select(
        "id, receipt_id, raw_name, price, quantity, unit, price_per_unit, product:products(canonical_name)",
      )
      .eq("receipt_id", receipt.id)
      // id is the tiebreaker so the order is stable across reloads (rows share
      // a created_at from bulk insert) — the list must never reorder on edit.
      .order("created_at", { ascending: true })
      .order("id", { ascending: true });
    if (itemsError) {
      setError(itemsError.message);
      setLoading(false);
      return;
    }
    const rows = (data ?? []) as unknown as AdminLineItem[];
    setItems(rows);
    setDrafts(Object.fromEntries(rows.map((r) => [r.id, toDraft(r)])));
    setLoading(false);
  }, [receipt.id]);

  useEffect(() => {
    // Load line items when the selected receipt changes; loadItems manages
    // its own loading/error state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadItems();
  }, [loadItems]);

  useEffect(() => {
    let cancelled = false;
    // Clear the previous receipt's image before signing the new one.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImageUrl(null);
    if (!receipt.image_path) return;
    void supabase.storage
      .from("receipts")
      .createSignedUrl(toObjectKey(receipt.image_path), 60 * 60)
      .then(({ data }) => {
        if (!cancelled && data?.signedUrl) setImageUrl(data.signedUrl);
      });
    return () => {
      cancelled = true;
    };
  }, [receipt.id, receipt.image_path]);

  const setDraftField = (id: string, field: keyof ItemDraft, value: string) => {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const isDirty = (item: AdminLineItem): boolean => {
    const d = drafts[item.id];
    if (!d) return false;
    return (
      d.raw_name !== (item.raw_name ?? "") ||
      numOrNull(d.price) !== item.price ||
      numOrNull(d.quantity) !== item.quantity ||
      d.unit.trim() !== (item.unit ?? "")
    );
  };

  const dirtyItems = items.filter(isDirty);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setNotice(null);
    const failures: string[] = [];
    const savedFields: Record<string, Partial<AdminLineItem>> = {};
    for (const item of dirtyItems) {
      const d = drafts[item.id];
      const fields = {
        raw_name: d.raw_name.trim() || null,
        price: numOrNull(d.price),
        quantity: numOrNull(d.quantity),
        unit: d.unit.trim() || null,
      };
      const { error: updateError } = await supabase
        .from("line_items")
        .update(fields)
        .eq("id", item.id);
      if (updateError) failures.push(`${d.raw_name || item.id}: ${updateError.message}`);
      else savedFields[item.id] = fields;
    }
    // Patch saved rows in place — preserves the on-screen order (no refetch,
    // no reorder). Failed rows keep their unsaved (dirty) state.
    setItems((prev) => prev.map((it) => (savedFields[it.id] ? { ...it, ...savedFields[it.id] } : it)));
    setSaving(false);
    if (failures.length) {
      setError(`Some items failed to save — ${failures.join("; ")}`);
    } else {
      setNotice(`Saved ${dirtyItems.length} item${dirtyItems.length === 1 ? "" : "s"}.`);
    }
  };

  const handleDelete = async (item: AdminLineItem) => {
    const name = item.raw_name || "this item";
    if (!window.confirm(`Delete "${name}" from the receipt?`)) return;
    setError(null);
    const { error: deleteError } = await supabase.from("line_items").delete().eq("id", item.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    await loadItems();
  };

  const handleStatus = async (status: ReviewStatus) => {
    setStatusBusy(true);
    setError(null);
    const { error: statusError } = await supabase
      .from("receipts")
      .update({ review_status: status })
      .eq("id", receipt.id);
    setStatusBusy(false);
    if (statusError) {
      setError(statusError.message);
      return;
    }
    onReceiptChanged({ ...receipt, review_status: status });
  };

  return (
    <div className="receipt-detail">
      <div className="receipt-detail-header">
        <div>
          <h2>{storeLabel(receipt)}</h2>
          <p className="receipt-detail-meta">
            {ownerLabel} · {formatDate(receipt.purchase_date ?? receipt.created_at)} ·{" "}
            {formatMoney(receipt.total_amount, receipt.currency)}
          </p>
        </div>
        <span className={`status-chip status-${receipt.review_status}`}>
          {receipt.review_status}
        </span>
      </div>

      <div className="receipt-status-actions">
        <button
          className="btn-verify"
          disabled={statusBusy || receipt.review_status === "verified"}
          onClick={() => void handleStatus("verified")}
        >
          ✓ Verify
        </button>
        <button
          className="btn-reject"
          disabled={statusBusy || receipt.review_status === "rejected"}
          onClick={() => void handleStatus("rejected")}
        >
          ✕ Reject
        </button>
        <button
          className="btn-reset"
          disabled={statusBusy || receipt.review_status === "submitted"}
          onClick={() => void handleStatus("submitted")}
        >
          Reset to submitted
        </button>
      </div>

      {error && <p className="admin-error">{error}</p>}
      {notice && <p className="admin-notice">{notice}</p>}

      <div className="receipt-detail-body">
        <div className="receipt-items">
          {loading ? (
            <p className="admin-muted">Loading items…</p>
          ) : items.length === 0 ? (
            <p className="admin-muted">No line items on this receipt.</p>
          ) : (
            <div className="items-table-wrap">
            <table className="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>$/unit</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const d = drafts[item.id];
                  if (!d) return null;
                  return (
                    <tr key={item.id} className={isDirty(item) ? "row-dirty" : ""}>
                      <td>
                        <input
                          className="item-input item-input-name"
                          value={d.raw_name}
                          onChange={(e) => setDraftField(item.id, "raw_name", e.target.value)}
                        />
                        {item.product?.canonical_name && (
                          <span className="item-product">→ {item.product.canonical_name}</span>
                        )}
                      </td>
                      <td>
                        <input
                          className="item-input item-input-num"
                          inputMode="decimal"
                          value={d.quantity}
                          onChange={(e) => setDraftField(item.id, "quantity", e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="item-input item-input-unit"
                          value={d.unit}
                          onChange={(e) => setDraftField(item.id, "unit", e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="item-input item-input-num"
                          inputMode="decimal"
                          value={d.price}
                          onChange={(e) => setDraftField(item.id, "price", e.target.value)}
                        />
                      </td>
                      <td className="item-ppu">
                        {formatPricePerUnit(
                          numOrNull(d.price),
                          numOrNull(d.quantity),
                          d.unit,
                        ) ?? "—"}
                      </td>
                      <td>
                        <button
                          className="btn-delete-item"
                          title="Delete item"
                          onClick={() => void handleDelete(item)}
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          )}

          {dirtyItems.length > 0 && (
            <div className="items-save-bar">
              <span>
                {dirtyItems.length} unsaved change{dirtyItems.length === 1 ? "" : "s"}
              </span>
              <button className="btn-primary" disabled={saving} onClick={() => void handleSave()}>
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          )}
        </div>

        <div className="receipt-image">
          {receipt.image_path ? (
            imageUrl ? (
              <a href={imageUrl} target="_blank" rel="noreferrer" title="Open full size">
                <img src={imageUrl} alt="Receipt" />
              </a>
            ) : (
              <p className="admin-muted">Loading image…</p>
            )
          ) : (
            <p className="admin-muted">No image on this receipt.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceiptDetail;
