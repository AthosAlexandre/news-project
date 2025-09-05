// src/lib/img.ts
export function absUrl(path?: string | null) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const origin = process.env.NEXT_PUBLIC_API_ORIGIN || "http://localhost:4000";
  return origin + path;
}
