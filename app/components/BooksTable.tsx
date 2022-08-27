import type { HTMLAttributes } from "react";
import { useState } from "react";
import type { Filter, RankedBook } from "~/types";

const host = "https://www.empik.com";

type Props = HTMLAttributes<HTMLTableElement> & {
  books: RankedBook[] | undefined;
  show: Filter["show"];
};

export const BooksTable = ({ books, show, ...props }: Props) => {
  const [active, setActive] = useState<number>();

  return (
    <table style={{ borderCollapse: "collapse" }} {...props}>
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
            onClick={() => setActive(active === i ? undefined : i)}
            style={{
              borderBottom: "1px solid lightgray",
              ...(i % 2 === 0 && { backgroundColor: "snow" }),
              ...(active === i && { backgroundColor: "lightyellow" }),
              ...(book.isNew && show !== "new" && { fontWeight: "bold" }),
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
            <td style={{ verticalAlign: "middle", width: "4em" }}>
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
