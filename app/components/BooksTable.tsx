import type { Book } from "~/types";

type Props = {
  books: Book[];
};

export const BooksTable = ({ books }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Okładka</th>
          <th>Tytuł</th>
          <th>Autor</th>
          <th>Cena</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>
            <a href={book.url} rel="noreferrer" target="_blank">
              <img src={book.image} alt={book.title} style={{maxHeight: "4em"}} />

              </a>
            </td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
