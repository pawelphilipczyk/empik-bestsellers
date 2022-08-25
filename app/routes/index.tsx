import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import type { PostgrestResponse } from "@supabase/supabase-js";
import { supabase } from "~/api/supabase.server";
import { BooksForm } from "~/components/BooksForm";
import { BooksTable } from "~/components/BooksTable";
import { PageFooter } from "~/components/PageFooter";
import type { BooksResponse, DatesResponse, RankedBook } from "~/types";
import { getRankedBooks } from "~/utils/compare";

type LoaderData = {
  books: RankedBook[];
  dates: DatesResponse;
  from: string;
  to: string;
};

const getList = (response: PostgrestResponse<BooksResponse>) =>
  response?.data?.[0].data.list || [];

const getDate = (response: PostgrestResponse<BooksResponse>) =>
  response?.data?.[0].date || "";

const isNew = (book: RankedBook) => book.isNew;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const prev = url.searchParams.get("prev") || "";
  const next = url.searchParams.get("next") || "";
  const show = url.searchParams.get("show") || "";

  const dates = await supabase
    .from<BooksResponse>("books")
    .select("date")
    .order("created_at", { ascending: false })
    .limit(30);

  const prevBooks = await supabase
    .from<BooksResponse>("books")
    .select("*")
    .eq("date", prev);

  const nextBooks = await supabase
    .from<BooksResponse>("books")
    .select("*")
    .eq("date", next);

  const rankdedBooks = getRankedBooks(getList(prevBooks), getList(nextBooks));
  const books = show === "all" ? rankdedBooks : rankdedBooks.filter(isNew);

  return json<LoaderData>({
    books,
    dates: dates.data?.map(({ date }) => date) || [],
    from: getDate(prevBooks),
    to: getDate(nextBooks),
  });
};

export default function Index() {
  const { books, dates, from, to } = useLoaderData() as LoaderData;

  return (
    <main
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.4",
        padding: "2em",
      }}
    >
      <header>
        <h1>Empik Bestsellers</h1>
        <BooksForm dates={dates} />
      </header>
      <section>
        <h2>
          Zmiany od <em>{from}</em> do <em>{to}</em>
        </h2>
        {books && <BooksTable books={books} />}
      </section>

      <PageFooter />
    </main>
  );
}
