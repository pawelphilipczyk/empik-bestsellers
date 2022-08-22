import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.DATABASE_URL as string,
  process.env.SUPABASE_SERVICE_API_KEY as string
);
