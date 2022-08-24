import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { supabase } from "~/api/supabase.server";
import { BooksTable } from "~/components/BooksTable";
import { DatesForm } from "~/components/DatesForm";
import type { BooksResponse, DatesResponse } from "~/types";

export async function loader() {
  const books = await supabase
    .from<BooksResponse>("books")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (books.error) return json(books.error, { status: 500 });

  const dates = await supabase
    .from<BooksResponse>("books")
    .select("date")
    .order("created_at", { ascending: false })
    .limit(30);

  return json({
    books: books.data[0],
    dates: dates.data?.map(({ date }) => date),
  });
}

type BooksData = {
  books: BooksResponse;
  dates: DatesResponse;
};

export default function Index() {
  const { books, dates } = useLoaderData<BooksData>();

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Empik Bestsellers</h1>
      <DatesForm dates={dates} />
      <BooksTable books={books.data.list} />
      <footer>
        <nav>
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
        </nav>
      </footer>
    </main>
  );
}
