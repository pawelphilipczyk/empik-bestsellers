import { Form, useTransition } from "@remix-run/react";
import type { HTMLAttributes } from "react";
import { useSearch } from "~/hooks/useSearch";
import type { DatesResponse } from "~/types";
import { dateToISOString } from "~/utils/date";

type Props = HTMLAttributes<HTMLFormElement> & {
  dates: DatesResponse;
};

export const BooksForm = ({ dates, ...rest }: Props) => {
  const params = useSearch(["prev", "next", "show"]);
  const transition = useTransition();
  const isLoading =
    transition.state === "loading" || transition.state === "submitting";

  const today = new Date();
  const lastWeek = new Date(Date.now() - 604800000);

  const defaultValue = {
    next: [dateToISOString(today), dates[0]].sort()[0],
    prev: [dateToISOString(lastWeek), dates[dates.length - 1]].sort()[0],
  };
  const dateProps = {
    max: dates[0],
    min: dates[dates.length - 1],
  };

  return (
    <Form action="" {...rest}>
      <fieldset style={{ borderColor: "lightgray", borderStyle: "solid" }}>
        <legend>Filtry</legend>
        <input
          type="date"
          name="prev"
          {...dateProps}
          defaultValue={defaultValue.prev}
        />
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
        <input
          type="date"
          name="next"
          {...dateProps}
          defaultValue={defaultValue.next}
        />
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
