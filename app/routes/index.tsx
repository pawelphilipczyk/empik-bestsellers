import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import type { PostgrestResponse } from "@supabase/supabase-js";
import { supabase } from "~/api/supabase.server";
import { BooksTable } from "~/components/BooksTable";
import { BooksForm } from "~/components/BooksForm";
import { PageFooter } from "~/components/PageFooter";
import type { BooksResponse, DatesResponse, RankedBook } from "~/types";
import { getRankedBooks } from "~/utils/compare";
import { useSearch } from "~/hooks/useSearch";

type LoaderData = {
  books: {
    prev: PostgrestResponse<BooksResponse>;
    next: PostgrestResponse<BooksResponse>;
  };
  dates: DatesResponse;
};

const getList = (response: PostgrestResponse<BooksResponse>) =>
  response?.data?.[0].data.list || [];

const getDate = (response: PostgrestResponse<BooksResponse>) =>
  response?.data?.[0].date || [];

const isNew = (book: RankedBook) => book.isNew;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const prev = url.searchParams.get("prev") || "";
  const next = url.searchParams.get("next") || "";

  const dates = await supabase
    .from<BooksResponse>("books")
    .select("date")
    .order("created_at", { ascending: false })
    .limit(30);

  const books = {
    prev: await supabase
      .from<BooksResponse>("books")
      .select("*")
      .eq("date", prev),
    next: await supabase
      .from<BooksResponse>("books")
      .select("*")
      .eq("date", next),
  };

  return json<LoaderData>({
    books,
    dates: dates.data?.map(({ date }) => date) || [],
  });
};

export default function Index() {
  const { books, dates } = useLoaderData() as LoaderData;
  const { show } = useSearch(["show"]);
  const allBooks = getRankedBooks(getList(books.prev), getList(books.next));
  const showBooks = show === "all" ? allBooks : allBooks.filter(isNew);

  return (
    <main
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.4",
        padding: "2em",
      }}
    >
      <header>
        {/* <h1>Empik Bestsellers</h1> */}
        <BooksForm dates={dates} />
      </header>
      <section>
        <h2>
          Zmiany od <em>{getDate(books.prev)}</em> do{" "}
          <em>{getDate(books.next)}</em>
        </h2>
        {books.next && <BooksTable books={showBooks} />}
      </section>

      <PageFooter />
    </main>
  );
}
