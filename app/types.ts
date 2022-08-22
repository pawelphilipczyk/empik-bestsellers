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