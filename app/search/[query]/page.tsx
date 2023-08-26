"use client";
import { Metadata } from "next";
import { getVideoDataBySlug } from "@/app/utils/api";
import Image from "next/image";
import {
  useInfiniteHits,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import Link from "next/link";
import { useEffect, useState } from "react";
import { get } from "http";

type Props = {
  params: {
    // lang: string,
    query: string;
  };
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   //   const page = await getPageBySlug(params.slug);
//   //   if (!page || !page.data[0].attributes?.seo) return FALLBACK_SEO;
//   //   const metadata = page.data[0].attributes.seo;

//   const { slug } = params;
//   const pageSlug = slug[0];
//   const videoSlug = slug[2];

//   //todo check
//   if (videoSlug) {
//     const videoInfo = await getVideoDataBySlug(videoSlug, false);

//     const videoMetadata = getMetaFromVideo(
//       videoInfo?.attributes?.video_name || videoSlug,
//       pageSlug
//     );
//     return {
//       title: videoMetadata.title,
//       description: videoMetadata.description,
//     };
//   }

//   return getMetaFromMasterTag(pageSlug);
// }

// const getImageURL = (slug: string) => {
//   const pageData = MASTER_TAGS_CONTENT.data.find(
//     (d: any) => d.attributes.slug === slug
//   );
//   if (!pageData) return undefined;
//   return pageData?.attributes.image.data.attributes.url;
// };

// const getTitleAndDescription = (slug: string) => {
//   const pageData = MASTER_TAGS_CONTENT.data.find(
//     (d: any) => d.attributes.slug === slug
//   );
//   if (!pageData) return { title: null, description: null };
//   const { title, description } = pageData?.attributes as any;
//   return { title: title || null, description: description || null };
// };

export default function PageRoute({ params }: Props) {
  const { hits, showMore, isLastPage } = useInfiniteHits();
  const { status, indexUiState, setIndexUiState } = useInstantSearch();
  const [videos, setVideos] = useState<any>([]);
  // const { pageData: page } = await getPageBySlug(pageSlug);
  // const { title, description } = getTitleAndDescription(pageSlug);
  const getVideos = async (hits: any) => {
    console.log({ hits });
    const videos = await Promise.all(
      hits.map(async (hit: any) => {
        const video = await getVideoDataBySlug(hit.slug, true);
        if (!video || !video[0]) return null;
        const videoThumbnail =
          video[0].attributes.thumbnail?.data?.attributes?.url ??
          `https://image.mux.com/${video[0]?.attributes?.mux_video?.data?.attributes?.playback_id}/thumbnail.jpg?time=0`;

        return {
          video_name: hit.video_name,
          slug: hit.slug,
          thumbnail: videoThumbnail,
        };
      })
    );
    console.log({ videos });
    setVideos([...videos]);
  };

  useEffect(() => {
    setIndexUiState({
      ...indexUiState,
      query: params.query,
    });
  }, [params.query]);

  useEffect(() => {
    if (!hits || hits.length === 0) return;

    getVideos(hits);
  }, [hits]);
  // if (!page || page.data.length === 0) return null;

  if (!hits || hits.length === 0) return null;

  return (
    <>
      <div className="text-center">
        <h1 className="main-heading">Search Results</h1>
        <p className="main-subtitle">
          {hits.length} results found for &quot;{indexUiState.query}&quot;
        </p>
      </div>
      <div className="flex flex-col py-2 gap-6">
        <div className="px-4">
          <h2 className="py-2 section-heading">Videos</h2>
          <div className="pt-2">
            <div className="py-2 video-grid">
              {videos.map((video: any) => {
                return (
                  <Link
                    key={video.id}
                    href={`/video/${video.slug}`}
                    className="flex flex-col"
                  >
                    <div className="flex flex-col items-start justify-between gap-2">
                      <Image
                        src={video.thumbnail}
                        alt="video thumbnail"
                        width={500}
                        height={500}
                        className="rounded-lg"
                      />
                      <p className="video-name">{video.video_name}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className={`bg-black text-white px-4 py-2 rounded-lg ${
            isLastPage ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={showMore}
          disabled={isLastPage}
        >
          {isLastPage ? "No more results" : "Load more"}
        </button>
      </div>
    </>
  );
}