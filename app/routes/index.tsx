import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { supabase } from "~/api/supabase.server";
import { BooksTable } from "~/components/BooksTable";
import type { BooksResponse } from "~/types";

export async function loader() {
  const { data, error } = await supabase
    .from<BooksResponse>("books")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) return json(error, { status: 500 });

  return json(data[0]);
}

const useBooksData = () => useLoaderData<BooksResponse>();

export default function Index() {
  const books = useBooksData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Empik Bestsellers</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://www.empik.com/bestsellery/ksiazki"
            rel="noreferrer"
          >
            TOP 100 Books
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://app.supabase.com/project/ffhywchyftfmmkbszwub"
            rel="noreferrer"
          >
            Supabase
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      <BooksTable books={books.data.list} />
    </div>
  );
}
