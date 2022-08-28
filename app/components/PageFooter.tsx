import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const PageFooter = (props: Props) => (
  <footer {...props}>
    <h6>© Paweł Philipczyk</h6>
  </footer>
);
