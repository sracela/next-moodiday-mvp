import { fetchAPI } from "@/app/utils/fetch-api";
import { getStrapiURL } from "./api-helpers";

export async function getPageBySlug(slug?: string) {
  //   const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  //   const path = `/pages`;
  const path = `/get/video`;
  const urlParamsObject = { tags: slug };
  //   const options = { headers: { Authorization: `Bearer ${token}` } };
  //   return await fetchAPI(path, urlParamsObject, { method: "POST" });
  const requestUrl = `${getStrapiURL(`/api${path}`)}`;
  const response = await fetch(requestUrl, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(urlParamsObject),
  });
  const data = await response.json();
  return data;
}
