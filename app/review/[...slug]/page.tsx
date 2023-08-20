import { Metadata } from "next";
import { getPageBySlug, getVideoDataBySlug } from "@/app/utils/api";
import { getMetaFromMasterTag, getMetaFromVideo } from "../../utils/metadata";
import MainSection from "../../components/MainSection";
import { MASTER_TAGS_CONTENT } from "../../utils/constants";
import Modal from "../../components/Modal";
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
  const videoSlug = slug[2];

  //todo check
  if (videoSlug) {
    const videoInfo = await getVideoDataBySlug(videoSlug, false);

    const videoMetadata = getMetaFromVideo(
      videoInfo?.attributes?.video_name || videoSlug,
      pageSlug
    );
    return {
      title: videoMetadata.title,
      description: videoMetadata.description,
    };
  }

  return getMetaFromMasterTag(pageSlug);
}

const getImageURL = (slug: string) => {
  const pageData = MASTER_TAGS_CONTENT.data.find(
    (d: any) => d.attributes.slug === slug
  );
  if (!pageData) return undefined;
  return pageData?.attributes.image.data.attributes.url;
};

const getTitleAndDescription = (slug: string) => {
  const pageData = MASTER_TAGS_CONTENT.data.find(
    (d: any) => d.attributes.slug === slug
  );
  if (!pageData) return { title: null, description: null };
  const { title, description } = pageData?.attributes as any;
  return { title: title || null, description: description || null };
};

export default async function PageRoute({ params }: Props) {
  const { slug } = params;
  const pageSlug = slug[0];
  const videoSlug = slug[2];
  const { pageData: page } = await getPageBySlug(pageSlug);
  const { title, description } = getTitleAndDescription(pageSlug);

  if (!page || page.data.length === 0) return null;

  //   const contentSections = page.data[0].attributes.contentSections;
  //   return contentSections.map((section: any, index: number) =>
  //     sectionRenderer(section, index)
  //   );

  const getVideoURL = () => {
    return "review/" + pageSlug;
  };

  if (!videoSlug) {
    return (
      <MainSection
        page={page}
        title={title}
        description={
          pageSlug === "home" || pageSlug === "" ? description : null
        }
        imageURL={getImageURL(pageSlug)}
        getVideoURL={getVideoURL}
      />
    );
  }

  const video = await getVideoDataBySlug(videoSlug);
  return (
    <>
      <MainSection
        page={page}
        title={title}
        imageURL={getImageURL(pageSlug)}
        getVideoURL={getVideoURL}
      />
      <Modal video={video} slug={slug} />
    </>
  );
}
