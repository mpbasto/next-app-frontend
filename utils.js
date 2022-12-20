const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/api";

async function fetchQuery(path, slug = null) {
  let url;

  if (slug !== null) {
    url = `${baseUrl}/${path}/?filters\[Slug\][$eq]=${slug}&populate=*`;
  } else {
    url = `${baseUrl}/${path}?populate=*`;
  }

  const response = await fetch(`${url}`);
  const data = await response.json();
  return data;
}

export { baseUrl, fetchQuery };
