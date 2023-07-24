import { fetchAPI } from "@/app/utils/fetch-api";
import { getStrapiURL } from "./api-helpers";

export async function getPageBySlug(slug?: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const path = `/rel-mas-tag-cats?filters[master_tag][tag_name][$eq]=${getTags(
    slug
  )}&populate[master_categories][populate][0]=video_details`;
  const data = await fetchAPI(path, {}, options);
  const videoIds = data.data[0].attributes.master_categories.data.map(
    (section: any) => {
      return section.attributes.video_details.data.map((video: any) => {
        return video.id;
      });
    }
  );
  const videoData = await Promise.all(
    videoIds.flat().map((id: any) => {
      return getVideoDataById(id);
    })
  );
  return { pageData: data.data[0].attributes.master_categories, videoData };

  // const path = `/get/video`;
  // const urlParamsObject = { tags: getTags(slug?.[0]) };
  //   return await fetchAPI(path, urlParamsObject, { method: "POST" });
  // const requestUrl = `${getStrapiURL(`/api${path}`)}`;
  // const response = await fetch(requestUrl, {
  //   method: "get",
  //   headers: { "Content-Type": "application/json" },
  //   // body: JSON.stringify(urlParamsObject),
  // });
  // const data = await response.json();
  // return data;
}

export const getTags = (slug?: string) => {
  if (!slug) return "Home";
  if (slug === "home") return "Home";
  if (slug === "products") {
    return "Products";
  }
  if (slug === "strains") {
    return "Strains";
  }
  if (slug === "accesories-devices") {
    return "Accessories%20%26%20Devices";
  }
  if (slug === "tips-tricks") {
    return "Tips%20%26%20Tricks";
  }
  return slug;
};

export async function getVideoDataById(id?: string) {
  if (!id) return;
  const path = `/video-details/${id}?populate[mux_video]=1&populate[thumbnail][fields][0]=url`;
  const requestUrl = `${getStrapiURL(`/api${path}`)}`;
  const response = await fetch(requestUrl, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data.data;
}

export async function getVideoDataBySlug(
  slug?: string,
  populate: boolean = true
) {
  if (!slug) return;
  const path = `/video-details?filters[slug][$eq]=${slug}${
    populate && "&populate[mux_video]=1&populate[thumbnail][fields][0]=url"
  }`;
  const requestUrl = `${getStrapiURL(`/api${path}`)}`;
  const response = await fetch(requestUrl, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data.data;
}
