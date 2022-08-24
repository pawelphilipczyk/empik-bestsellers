import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { supabase } from "~/api/supabase.server";
import { BooksTable } from "~/components/BooksTable";
import { DatesForm } from "~/components/DatesForm";
import type { BooksResponse, DatesResponse } from "~/types";

type LoaderData = {
  books: BooksResponse | undefined;
  dates: DatesResponse;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const date = url.searchParams.get("to") || "";

  const books = date
    ? await supabase.from<BooksResponse>("books").select("*").eq("date", date)
    : undefined;

  if (books?.error) return json(books.error, { status: 500 });

  const dates = await supabase
    .from<BooksResponse>("books")
    .select("date")
    .order("created_at", { ascending: false })
    .limit(30);

  return json<LoaderData>({
    books: books?.data[0],
    dates: dates.data?.map(({ date }) => date) || [],
  });
};

export default function Index() {
  const { books, dates } = useLoaderData() as LoaderData;

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Empik Bestsellers</h1>
      <DatesForm dates={dates} />
      <h2>{books?.date}</h2>
      {books?.data && <BooksTable books={books.data.list} />}
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
