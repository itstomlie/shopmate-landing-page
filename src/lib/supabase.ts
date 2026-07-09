import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  // Surface a clear error in dev instead of a cryptic fetch failure.
  console.error(
    "Missing VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY — admin page cannot connect.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
