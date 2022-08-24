import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import type { PostgrestResponse } from "@supabase/supabase-js";
import { supabase } from "~/api/supabase.server";
import { BooksTable } from "~/components/BooksTable";
import { DatesForm } from "~/components/DatesForm";
import type { BooksResponse, DatesResponse } from "~/types";
import { createBookComparator, getBooksMap, withPosition } from "~/utils/compare";

type LoaderData = {
  books: {
    to: PostgrestResponse<BooksResponse>;
    from: PostgrestResponse<BooksResponse>;
  };
  dates: DatesResponse;
};

const getList = (response: PostgrestResponse<BooksResponse>) =>
  response?.data?.[0].data.list || [];

const getDate = (response: PostgrestResponse<BooksResponse>) =>
  response?.data?.[0].date || [];

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const to = url.searchParams.get("to") || "";
  const from = url.searchParams.get("from") || "";

  const dates = await supabase
    .from<BooksResponse>("books")
    .select("date")
    .order("created_at", { ascending: false })
    .limit(30);

  const books = {
    from: await supabase
      .from<BooksResponse>("books")
      .select("*")
      .eq("date", from),
    to: await supabase.from<BooksResponse>("books").select("*").eq("date", to),
  };

  return json<LoaderData>({
    books,
    dates: dates.data?.map(({ date }) => date) || [],
  });
};

export default function Index() {
  const { books, dates } = useLoaderData() as LoaderData;

  const prevBooks = getBooksMap(getList(books.from));

  const withChanges = createBookComparator(prevBooks);
  const nextBooks = getList(books.to).map(withPosition).map(withChanges);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4", padding: "2em" }}>
      <h1>Empik Bestsellers</h1>
      <DatesForm dates={dates} />
      <section>
        <h2>Zmiany od <em>{getDate(books.from)}</em> do <em>{getDate(books.to)}</em></h2>
        {books.to && <BooksTable books={nextBooks} />}
      </section>

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
