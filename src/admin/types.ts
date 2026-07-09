export type ReviewStatus = "submitted" | "verified" | "rejected";

export interface AdminUserOverview {
  user_id: string;
  email: string | null;
  display_name: string | null;
  user_role: string | null;
  is_anonymous: boolean;
  receipt_count: number;
  submitted_count: number;
  verified_count: number;
  rejected_count: number;
  last_receipt_at: string | null;
}

export interface AdminReceipt {
  id: string;
  user_id: string;
  purchase_date: string | null;
  total_amount: number | null;
  currency: string;
  status: string | null;
  review_status: ReviewStatus;
  image_path: string | null;
  created_at: string | null;
  store: {
    branch_name: string | null;
    chain: { name: string } | null;
  } | null;
}

export interface AdminLineItem {
  id: string;
  receipt_id: string;
  raw_name: string | null;
  price: number | null;
  quantity: number | null;
  unit: string | null;
  price_per_unit: number | null;
  product: { canonical_name: string | null } | null;
}

export const userLabel = (u: AdminUserOverview): string =>
  u.display_name || u.email || (u.is_anonymous ? "Anonymous user" : "Unnamed user");

export const formatMoney = (amount: number | null, currency: string): string => {
  if (amount == null) return "—";
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
};

export const formatDate = (iso: string | null): string => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
};
