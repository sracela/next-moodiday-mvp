import { Metadata } from "next";
import { getBrands, getPageBySlug, getStates } from "@/app/utils/api";
import { getMetaFromMasterTag } from "../utils/metadata";
import MainSection from "../components/MainSection";
import { MASTER_TAGS_CONTENT } from "../utils/constants";
import NotFound from "../not-found";

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
  const { pageData: page, pageConfig, isError } = await getPageBySlug(pageSlug);

  const states = await getStates();
  const brands = await getBrands();
  const { title, description } = getTitleAndDescription(pageSlug);
  const getVideoURL = () => {
    return pageSlug;
  };

  if (isError) return <NotFound />;
  if (!page) return null;

  return (
    <MainSection
      page={page}
      pageConfig={pageConfig}
      states={states}
      brands={brands}
      title={title}
      description={pageSlug === "home" || pageSlug === "" ? description : null}
      imageURL={getImageURL(pageSlug)}
      getVideoURL={getVideoURL}
    />
  );
}
