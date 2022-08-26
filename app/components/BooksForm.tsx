import { Form, useTransition } from "@remix-run/react";
import type { HTMLAttributes } from "react";
import { useSearch } from "~/hooks/useSearch";
import type { DatesResponse } from "~/types";

type Props = HTMLAttributes<HTMLFormElement> & {
  dates: DatesResponse;
};

export const BooksForm = ({ dates, ...rest }: Props) => {
  const params = useSearch(["prev", "next", "show"]);
  const transition = useTransition();
  const isLoading =
    transition.state === "loading" || transition.state === "submitting";

  return (
    <Form action="" {...rest}>
      <fieldset style={{ borderColor: "lightgray", borderStyle: "solid" }}>
        <legend>Filtry</legend>
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
        <button
          style={{ marginLeft: 10, marginRight: 10 }}
          disabled={isLoading}
        >
          Porównaj
        </button>
        {isLoading && <em>Wczytuję...</em>}
      </fieldset>
    </Form>
  );
};
