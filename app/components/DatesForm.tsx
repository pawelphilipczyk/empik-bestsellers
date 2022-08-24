import { Form, useSearchParams } from "@remix-run/react";
import type { DatesResponse } from "~/types";

type Props = {
  dates: DatesResponse;
};

export const DatesForm = ({ dates }: Props) => {
  const [searchParams] = useSearchParams();

  const from = searchParams.get("from") || undefined;
  const to = searchParams.get("to") || undefined;

  return (
    <Form action="">
      <fieldset>
        <legend>Daty</legend>
        <select name="from" defaultValue={from}>
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
        <select name="to" defaultValue={to}>
          {dates.slice(0, dates.length - 2).map((date) => (
            <option value={date} key={date}>
              {date}
            </option>
          ))}
        </select>
        <button style={{ marginLeft: 10 }}>Porównaj</button>
      </fieldset>
    </Form>
  );
};
