import Image from "next/image";
import { getPageBySlug } from "./utils/api";
import Link from "next/link";

export default async function Home() {
  const slug = "Home";
  const { pageData: homePage, videoData } = await getPageBySlug(slug);
  if (homePage.data.length === 0) return null;
  return (
    <>
      <div className="text-center">
        <h1 className="main-heading">Community-Powered Cannabis</h1>
        <p className="main-subtitle">
          Verified reviews from real buds, not bots
        </p>
        <Image
          src="https://moodiday.nyc3.digitaloceanspaces.com/moodiday/e5bb3bc88700d2d11fe403cba149ae0a.svg"
          alt="hero image"
          width={500}
          height={500}
          className="hero-image"
        />
      </div>
      <div className="flex flex-col py-2 gap-6">
        {homePage.data.map((section: any) => (
          <div key={section.id}>
            <h2 className="py-2">{section.attributes.category_name}</h2>
            <div className="flex flex-row gap-3 py-3 overflow-x-auto">
              {section.attributes.video_details.data.map((video: any) => {
                const videoPopulated = videoData.find((v) => v.id === video.id);
                const videoThumbnail =
                  videoPopulated.attributes.thumbnail?.data?.attributes?.url ??
                  `https://image.mux.com/${videoPopulated?.attributes?.mux_video?.data?.attributes?.playback_id}/thumbnail.jpg?time=0`;
                return (
                  <Link
                    key={video.id}
                    href={`/${slug}/${video.attributes.slug}`}
                  >
                    <div className="flex flex-col items-start justify-between gap-2">
                      <div
                        style={{
                          width: "max-content",
                        }}
                      >
                        <Image
                          src={videoThumbnail}
                          alt={video?.title}
                          className="thumbnail-image"
                          width={165}
                          height={273}
                        />
                      </div>
                      <p>{video.attributes.video_name}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
