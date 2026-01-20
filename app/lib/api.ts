export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const fallbackApiUrl = `https://be-sporton.agunacourse.com/api`;
const apiUrl = process.env.NEXT_PUBLIC_API_URL || fallbackApiUrl;
const res = await fetch(`${apiUrl}${endpoint}`, { ...options, cache: options?.cache || "no-store", });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    cache: options?.cache || "no-store", // kita set no-store karena kita ingin mendapat data lebih real time atau lebih updated
  });

  if (!res.ok) {
    let errorMessage = `Failed to fetch data from ${endpoint}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      console.log(e);
    }

    throw new Error(errorMessage);
  }

  return res.json();
}

export function getImageUrl(path: string) {
  if (path.startsWith("http")) return path; // artinya url udh valid
  return `${process.env.NEXT_PUBLIC_API_ROOT}/${path}`;
}
