import type { Book, BooksMap, RankedBook } from "~/types";

export const withPosition = (book: Book, position: number): RankedBook => ({
  ...book,
  position,
});

export const getBooksMap = (books: Book[]): BooksMap =>
  books.reduce(
    (map, book, position) => ({ ...map, [book.title]: { ...book, position } }),
    {}
  );

export const createBookComparator =
  (map: ReturnType<typeof getBooksMap>) => (book: RankedBook) => {
    const isNew = !map[book.title];
    const moved = map[book.title]?.position - book?.position;
    return { ...book, isNew, moved };
  };
