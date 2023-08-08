import { Metadata } from "next";
import { getPageBySlug, getVideoDataBySlug } from "@/app/utils/api";
import { getMetaFromMasterTag, getMetaFromVideo } from "../utils/metadata";
import MainSection from "../components/MainSection";
import { MASTER_TAGS_CONTENT } from "../utils/constants";
import Modal from "../components/Modal";
import Image from "next/image";

type Props = {
  params: {
    // lang: string,
    slug: Array<string>;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  //   const page = await getPageBySlug(params.slug);

  //   if (!page || !page.data[0].attributes?.seo) return FALLBACK_SEO;
  //   const metadata = page.data[0].attributes.seo;
  const { slug } = params;
  const pageSlug = slug[0];
  const videoSlug = slug[1];

  const videoInfo = await getVideoDataBySlug(videoSlug, false);
  console.log({ videoInfo, videoSlug });

  const metadata = !videoSlug
    ? getMetaFromMasterTag(pageSlug)
    : getMetaFromVideo(
        videoInfo?.attributes?.video_name || videoSlug,
        pageSlug
      );

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

const getImageURL = (slug: string) => {
  if (slug === "home")
    return "https://moodiday.nyc3.digitaloceanspaces.com/moodiday/e5bb3bc88700d2d11fe403cba149ae0a.svg";
  const pageData = MASTER_TAGS_CONTENT.data.find(
    (d: any) => d.attributes.slug === slug
  );
  return pageData?.attributes.image.data.attributes.url;
};

const getTitleAndDescription = (slug: string) => {
  const pageData = MASTER_TAGS_CONTENT.data.find(
    (d: any) => d.attributes.slug === slug
  );
  const { title, description } = pageData?.attributes as any;
  return { title: title || null, description: description || null };
};

export default async function PageRoute({ params }: Props) {
  const { slug } = params;
  const pageSlug = slug[0];
  const videoSlug = slug[2];
  const { pageData: page, videoData } = await getPageBySlug(pageSlug);
  if (page.data.length === 0) return null;
  const video = await getVideoDataBySlug(videoSlug);
  const { title, description } = getTitleAndDescription(pageSlug);

  //   const contentSections = page.data[0].attributes.contentSections;
  //   return contentSections.map((section: any, index: number) =>
  //     sectionRenderer(section, index)
  //   );

  return (
    <>
      <MainSection
        page={page}
        title={title}
        description={
          pageSlug === "home" || pageSlug === "" ? description : null
        }
        imageURL={getImageURL(pageSlug)}
        videoData={videoData}
        pageSlug={pageSlug}
      />
      <Modal pageSlug={pageSlug} video={video} />
    </>
  );
}
