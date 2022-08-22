import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";
import { fetchBestsellerBooks } from "~/api/empik.server";

// Connect to our database
const { DATABASE_URL, SUPABASE_SERVICE_API_KEY } = process.env;
export const supabase = createClient(
  DATABASE_URL as string,
  SUPABASE_SERVICE_API_KEY as string
);
export async function loader({ request }: LoaderArgs) {
  const authorization = request.headers.get("authorization");
  if (authorization === `Bearer ${process.env.CRON_SECRET}`) {
    const list = await fetchBestsellerBooks();
    // Insert a row
    const { data, error } = await supabase
      .from("books")
      .upsert({ data: { list } });

    // Did it work?
    console.log(data, error);

    return json({ success: true }, 200);
  } else {
    return json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
        headers: {
          "WWW-Authenticate": "Bearer",
        },
      }
    );
  }
}
