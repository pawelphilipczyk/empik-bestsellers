import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import type { PostgrestResponse } from "@supabase/supabase-js";
import { supabase } from "~/api/supabase.server";
import { BooksTable } from "~/components/BooksTable";
import { DatesForm } from "~/components/DatesForm";
import { PageFooter } from "~/components/PageFooter";
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
      <header>
        {/* <h1>Empik Bestsellers</h1> */}
        <DatesForm dates={dates} />
      </header>
      <section>
        <h2>Zmiany od <em>{getDate(books.from)}</em> do <em>{getDate(books.to)}</em></h2>
        {books.to && <BooksTable books={nextBooks} />}
      </section>

      <PageFooter />
    </main>
  );
}
