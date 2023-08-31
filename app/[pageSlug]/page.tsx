import { Metadata } from "next";
import { getPageBySlug, getStates } from "@/app/utils/api";
import { getMetaFromMasterTag } from "../utils/metadata";
import MainSection from "../components/MainSection";
import { MASTER_TAGS_CONTENT } from "../utils/constants";

type Props = {
  params: {
    // lang: string,
    pageSlug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  //   const page = await getPageBySlug(params.slug);
  //   if (!page || !page.data[0].attributes?.seo) return FALLBACK_SEO;
  //   const metadata = page.data[0].attributes.seo;

  const { pageSlug } = params;

  return getMetaFromMasterTag(pageSlug);
}

const getImageURL = (slug: string) => {
  if (slug === "home")
    return "https://moodiday.nyc3.digitaloceanspaces.com/moodiday/e5bb3bc88700d2d11fe403cba149ae0a.svg";
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
  const { pageSlug } = params;
  const { pageData: page, pageConfig } = await getPageBySlug(pageSlug);
  const states = await getStates();
  const { title, description } = getTitleAndDescription(pageSlug);

  if (!page || page.data.length === 0) return null;

  const getVideoURL = () => {
    return pageSlug;
  };

  return (
    <MainSection
      page={page}
      pageConfig={pageConfig}
      states={states}
      title={title}
      description={pageSlug === "home" || pageSlug === "" ? description : null}
      imageURL={getImageURL(pageSlug)}
      getVideoURL={getVideoURL}
    />
  );
}
