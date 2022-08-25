import type { Filter, RankedBook } from "~/types";

type Props = {
  books: RankedBook[] | undefined;
  show: Filter["show"];
};

export const BooksTable = ({ books, show }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Okładka</th>
          <th>Tytuł</th>
          <th>Autor</th>
          <th>Cena</th>
          <th>Zmiana</th>
        </tr>
      </thead>
      <tbody>
        {books?.map((book, i) => (
          <tr
            key={i}
            style={
              book.isNew && show !== "new"
                ? {
                    fontWeight: "bold",
                  }
                : undefined
            }
          >
            <td>{book.position + 1}</td>
            <td>
              <a href={book.url} rel="noreferrer" target="_blank">
                <img
                  src={book.image}
                  alt={book.title}
                  style={{ height: "4em" }}
                />
              </a>
            </td>
            <td>
              {book.title}{" "}
              {book.isNew && <strong style={{ color: "red" }}>NOWOŚĆ</strong>}
            </td>
            <td>{book.author}</td>
            <td>{book.price}</td>
            <td
              style={{
                textAlign: "right",
                color: Number(book.moved) > 0 ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {Number(book.moved) > 0 && `+`}
              {Boolean(book.moved) && book.moved}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
