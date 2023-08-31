import { Metadata } from "next";
import { getVideosByMasterCatergory } from "@/app/utils/api";
import Link from "next/link";
import { getMetaFromMasterTag } from "../../utils/metadata";
import Image from "next/image";
import Badge from "../../components/Badge";

type Props = {
  params: {
    // lang: string,
    category: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  //   const page = await getPageBySlug(params.slug);
  //   if (!page || !page.data[0].attributes?.seo) return FALLBACK_SEO;
  //   const metadata = page.data[0].attributes.seo;

  const { category } = params;

  return getMetaFromMasterTag(category);
}

export default async function PageRoute({ params }: Props) {
  const { category } = params;
  const videos = await getVideosByMasterCatergory(decodeURI(category));

  if (!videos || videos.length === 0)
    return (
      <div className="flex flex-col py-2 gap-6">
        <div className="px-4">
          <h2 className="py-2 section-heading">{decodeURI(category)}</h2>
          <div className="pt-2">
            <h3>Videos are not found in this Category</h3>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col py-2 gap-6">
      <div className="px-4">
        <h2 className="py-2 section-heading">{decodeURI(category)}</h2>
        <div className="pt-2">
          <div className="py-2 video-grid">
            {videos.map((video: any) => {
              const videoThumbnail =
                video.attributes.thumbnail?.data?.attributes?.url ??
                `https://image.mux.com/${video?.attributes?.mux_video?.data?.attributes?.playback_id}/thumbnail.jpg?time=0`;

              return (
                <Link
                  key={video.id}
                  href={`/viewAll/${category}/video/${video.attributes.slug}`}
                  className="flex flex-col"
                >
                  <div className="flex flex-col items-start justify-between gap-2 relative">
                    {video.attributes.subcategories && (
                      <Badge tag={video.attributes.subcategories} />
                    )}
                    <Image
                      src={videoThumbnail}
                      alt="video thumbnail"
                      width={500}
                      height={500}
                      className="rounded-lg"
                    />
                    <p className="video-name">{video.attributes.video_name}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
