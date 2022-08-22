import type { Book } from "~/types";

type Props = {
  books: Book[];
};

export const BooksList = ({ books }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Cover</th>
          <th>Title</th>
          <th>Author</th>
          <th>Price</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>
              <img src={book.image} alt={book.title} />
            </td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.price}</td>
            <td>
              <a href={book.url} rel="noreferrer" target="_blank">
                ▶️
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
