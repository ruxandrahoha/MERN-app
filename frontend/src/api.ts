export function apiFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  if (typeof input === "string") {
    // if input is a string, prepend the base API URL
    input = baseUrl + input;
  } else if (input instanceof Request) {
    // if input is a Request object, create a new Request with updated URL
    input = new Request(baseUrl + input.url, {
      ...input,
      // preserve original body, method, headers, etc.
    });
  }

  return fetch(input, init);
}
