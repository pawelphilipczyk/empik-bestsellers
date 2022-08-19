import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { fetchBestsellerBooks } from "~/api/empik";

export async function loader() {
  const books = await fetchBestsellerBooks();
  return json({ books });
}

export default function Index() {
  const data = useLoaderData();

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
      <pre>{JSON.stringify(data?.books, undefined, 2)}</pre>
    </div>
  );
}
