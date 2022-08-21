import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { fetchBestsellerBooks } from "~/api/empik.server";

dotenv.config();

// Connect to our database
const { DATABASE_URL, SUPABASE_SERVICE_API_KEY } = process.env;
export const supabase = createClient(
  DATABASE_URL as string,
  SUPABASE_SERVICE_API_KEY as string
);

// Our standard serverless handler function
const handler: Handler = async (event) => {
  const list = await fetchBestsellerBooks();
  // Insert a row
  const { data, error } = await supabase
    .from("books")
    .upsert({ data: { list } });

  // Did it work?
  console.log(data, error);

  return {
    statusCode: 200,
    body: JSON.stringify({ list }),
  };
};

export { handler };
