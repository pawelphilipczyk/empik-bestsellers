export type Book = {
  title: string;
  author: string;
  image: string;
  price: string;
  score: string;
  url: string;
};

export type BooksResponse = {
  date: string;
  created_at: string;
  data: {
    list: Book[];
  };
};

export type DatesResponse = string[];

export type RankedBook = Book & { position: number, moved?: number, isNew?: boolean };

export type BooksMap = Record<string, RankedBook>;