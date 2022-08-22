import { load } from "cheerio";
import fetch from "node-fetch";
import type { Book } from "~/types";

const feed = "https://www.empik.com/bestsellery/ksiazki";

const getPageUrl = (start: string = "0") =>
  feed +
  "?" +
  new URLSearchParams({
    searchCategory: "31",
    hideUnavailable: "false",
    start,
    resultsPP: "60",
  });

async function fetchPage(url: string) {
  return fetch(url)
    .then((response) => response.text())
}

function parsePage(html: string) {
  const books: Partial<Book>[] = [];
  const $ = load(html);

  $(".search-list-item").each((i: number, elem: Element) => {
    const [, title] = $(".ta-product-title", elem).text().split("\n");
    const author = $(".ta-product-smartauthor", elem).text().trim();
    const image = $("img", elem).attr("lazy-img");
    const score = $(".score", elem).text().trim();
    const url = $("a", elem).attr("href");
    const price = $(".ta-price-tile", elem)
      .text()
      .split("\n")
      .filter(Boolean)
      .shift();
    books.push({ title, author, image, price, score, url });
  });

  return books;
}

export async function fetchBestsellerBooks() {
  const urls = [undefined, "61"].map(getPageUrl);

  try {
    const pages = await Promise.all(urls.map(fetchPage));
    return pages.map(parsePage).flat();
  } catch (error) {
    return { error };
  }
}
