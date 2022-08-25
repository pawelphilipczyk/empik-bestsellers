import { Form, useSearchParams } from "@remix-run/react";
import type { DatesResponse } from "~/types";

type Props = {
  dates: DatesResponse;
};

export const DatesForm = ({ dates }: Props) => {
  const [searchParams] = useSearchParams();

  const prev = searchParams.get("prev") || undefined;
  const next = searchParams.get("next") || undefined;

  return (
    <Form action="">
      <fieldset>
        <legend>Daty</legend>
        <select name="prev" defaultValue={prev}>
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
        <select name="next" defaultValue={next}>
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
