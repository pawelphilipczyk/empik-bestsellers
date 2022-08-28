import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export async function fetchWithTimeout(
  resource: Request | string,
  options?: { timeout: number }
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 1000);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}

export const loader: LoaderFunction = async ({ params }) => {
  const url = `http://${params.ip}/rpc/Shelly.GetInfo`;
  const response = await fetchWithTimeout(url)
    .then((response) => response.json())
    .catch((error) => new Error(error));
  return json(response);
};
