import type { Filter, RankedBook } from "~/types";

const host = "https://www.empik.com";

type Props = {
  books: RankedBook[] | undefined;
  show: Filter["show"];
};

export const BooksTable = ({ books, show }: Props) => {
  return (
    <table style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: "4em" }}>↑↓</th>
          <th colSpan={2} style={{ textAlign: "left" }}>
            Książka
          </th>
        </tr>
      </thead>
      <tbody>
        {books?.map((book, i) => (
          <tr
            key={i}
            style={{
              borderBottom: "1px solid lightgray",
              ...(book.isNew && show !== "new"
                ? {
                    fontWeight: "bold",
                  }
                : undefined),
            }}
          >
            <td>{book.position + 1}</td>
            <td
              style={{
                textAlign: "center",
                color: Number(book.moved) > 0 ? "seagreen" : "firebrick",
                fontWeight: "bold",
              }}
            >
              {book.isNew && (
                <strong
                  style={{
                    fontSize: ".6em",
                    backgroundColor: "dodgerblue",
                    color: "white",
                    padding: ".2em",
                  }}
                >
                  NOWOŚĆ
                </strong>
              )}
              {Number(book.moved) > 0 && `↑`}
              {Number(book.moved) < 0 && `↓`}
              {book.moved && Boolean(book.moved) && Math.abs(book.moved)}
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <a href={host + book.url} rel="noreferrer" target="_blank">
                <img
                  src={book.image}
                  alt={book.title}
                  style={{ height: "6em" }}
                />
              </a>
            </td>
            <td>
              <h3>{book.title}</h3>
              <h5>
                {book.author} <em style={{ marginLeft: 10 }}>{book.price}</em>
              </h5>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
