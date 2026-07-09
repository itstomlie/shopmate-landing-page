// $/unit derivation, ported verbatim from the app's src/lib/helpers.ts so the
// admin shows the same per-unit price the app does. It is ALWAYS derived from
// the unit price × quantity — never entered. `price` here is the unit price
// (e.g. $6.39/kg), matching line_items.price.

type UnitToken = "kg" | "g" | "mL" | "L" | "each";

const canonicalUnit = (raw: string | null | undefined): UnitToken => {
  const u = String(raw ?? "")
    .trim()
    .toLowerCase();
  if (u === "kg") return "kg";
  if (u === "g" || u === "gram" || u === "grams") return "g";
  if (u === "ml") return "mL";
  if (u === "l" || u === "lt" || u === "litre" || u === "liter" || u === "litres") return "L";
  return "each";
};

// Display basis follows the unit: each -> per item, g -> /100g, kg -> /kg,
// mL -> /100mL, L -> /L. Returns null when it can't be derived (missing
// amount or total).
export const derivePricePerUnit = (
  price: number | null,
  quantity: number | null,
  unit: string | null,
): { value: string; unit: string } | null => {
  const amount = Number(quantity ?? 0);
  const lineTotal = Number(price ?? 0) * amount;
  if (!(amount > 0) || !(lineTotal > 0)) return null;

  switch (canonicalUnit(unit)) {
    case "each":
      return { value: (lineTotal / amount).toFixed(2), unit: "each" };
    case "g":
      return { value: (lineTotal / (amount / 100)).toFixed(2), unit: "100g" };
    case "kg":
      return { value: (lineTotal / amount).toFixed(2), unit: "kg" };
    case "mL":
      return { value: (lineTotal / (amount / 100)).toFixed(2), unit: "100mL" };
    case "L":
      return { value: (lineTotal / amount).toFixed(2), unit: "L" };
  }
};

// "$0.90 /100mL" / "$4.50 each" style label, or null when not derivable.
export const formatPricePerUnit = (
  price: number | null,
  quantity: number | null,
  unit: string | null,
): string | null => {
  const r = derivePricePerUnit(price, quantity, unit);
  if (!r) return null;
  return r.unit === "each" ? `$${r.value} each` : `$${r.value} /${r.unit}`;
};
