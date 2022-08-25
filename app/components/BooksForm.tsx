import { Form } from "@remix-run/react";
import { useSearch } from "~/hooks/useSearch";
import type { DatesResponse } from "~/types";

type Props = {
  dates: DatesResponse;
};

export const BooksForm = ({ dates }: Props) => {
  const params = useSearch(["prev", "next", "show"]);

  return (
    <Form action="">
      <fieldset>
        <legend>Daty</legend>
        <select name="prev" defaultValue={params.prev}>
          {[...dates.slice(1)].reverse().map((date) => (
            <option value={date} key={date}>
              {date}
            </option>
          ))}
        </select>
        <code
          style={{
            display: "inline-block",
            marginLeft: 10,
            marginRight: 10,
            fontSize: "2em",
          }}
        >
          ⟷
        </code>
        <select name="next" defaultValue={params.next}>
          {dates.slice(0, dates.length - 2).map((date) => (
            <option value={date} key={date}>
              {date}
            </option>
          ))}
        </select>
        <label htmlFor="show" style={{ marginLeft: 10, marginRight: 10 }}>
          Pokaż
        </label>
        <select name="show" defaultValue={params.show}>
          <option value="new">Nowości</option>
          <option value="all">Wszystkie</option>
        </select>
        <button style={{ marginLeft: 10 }}>Porównaj</button>
      </fieldset>
    </Form>
  );
};
