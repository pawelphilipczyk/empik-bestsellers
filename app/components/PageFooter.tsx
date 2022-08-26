import type { HTMLAttributes} from 'react';

type Props = HTMLAttributes<HTMLDivElement>

export const PageFooter = (props: Props) => (
  <footer {...props}>
    <nav>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://www.empik.com/bestsellery/ksiazki"
            rel="noreferrer"
          >
            TOP 100 Books
          </a>
        </li>
      </ul>
    </nav>
  </footer>
);
