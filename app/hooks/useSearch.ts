import { useSearchParams } from "@remix-run/react";

export const useSearch = <K extends string>(
  keys: K[]
): { [Key in K]: string } => {
  const [searchParams] = useSearchParams();

  return keys.reduce(
    (all, key) => ({ ...all, [key]: searchParams.get(key) || undefined }),
    {} as { [Key in K]: string }
  );
};
