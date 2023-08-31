import { fetchAPI } from "@/app/utils/fetch-api";
import { getStrapiURL } from "./api-helpers";

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
    return "Accessories & Devices";
  }
  if (slug === "tips-tricks") {
    return "Tips & Tricks";
  }
  return slug;
};

export async function getStates() {
  const path = "/master-categories";
  const urlParamsObject: any = {
    // filters: {
    //   category_name: {
    //     $eq: mc,
    //   },
    // },
    // populate: {
    //   video_details: {
    //     populate: {
    //       mux_video: true,
    //       thumbnail: {
    //         fields: ["url"],
    //       },
    //     },
    //   },
    // },
  };
  const data = await fetchAPI(path, urlParamsObject, {});

  return data.data;
}

export async function getVideosByMasterCatergory(mc: string) {
  // const path = "/master-categories";
  // const urlParamsObject: any = {
  //   filters: {
  //     category_name: {
  //       $eq: mc,
  //     },
  //   },
  //   populate: {
  //     video_details: {
  //       populate: {
  //         mux_video: true,
  //         thumbnail: {
  //           fields: ["url"],
  //         },
  //       },
  //     },
  //   },
  // };
  // const data = await fetchAPI(path, urlParamsObject, {});

  // return data[0].video_details;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/get/video_mc`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mastercategories: mc }),
    }
  )
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => {
      throw err;
    });

  const videos = response.data;
  const populatedVideos = await Promise.all(
    videos.map(async (video: any) => {
      const videoData = await getVideoDataBySlug(video.slug, true);
      return videoData[0];
    })
  );
  return populatedVideos;
}

export async function getPageBySlug(slug?: string) {
  // const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  // const options = { headers: { Authorization: `Bearer ${token}` } };
  const path = "/rel-mas-tag-cats";
  const urlParamsObject: any = {
    filters: {
      master_tag: {
        tag_name: {
          $containsi: getTags(slug),
        },
      },
    },
    populate: {
      master_tag: {
        populate: {
          quick_pic_position: true,
        },
      },
      master_categories: {
        populate: {
          video_details: {
            populate: {
              mux_video: true,
              thumbnail: {
                fields: ["url"],
              },
            },
          },
        },
      },
    },
  };
  const data = await fetchAPI(path, urlParamsObject, {});

  return {
    pageData: data.data[0].attributes.master_categories,
    pageConfig: data.data[0].attributes.master_tag,
  };
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
