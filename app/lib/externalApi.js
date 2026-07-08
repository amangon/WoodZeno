export const EXTERNAL_API_BASE =
  process.env.NEXT_PUBLIC_EXTERNAL_API_BASE ||
  "https://mywoods-api.onrender.com";

export const EXTERNAL_API_PATH =
  process.env.NEXT_PUBLIC_EXTERNAL_API_PATH || "/ap1/woods";

export function externalUrl(suffix = "") {
  const base = EXTERNAL_API_BASE.replace(/\/$/, "");
  const path = EXTERNAL_API_PATH.startsWith("/")
    ? EXTERNAL_API_PATH
    : `/${EXTERNAL_API_PATH}`;
  const cleanSuffix = suffix
    ? suffix.startsWith("/")
      ? suffix
      : `/${suffix}`
    : "";
  return `${base}${path}${cleanSuffix}`;
}


