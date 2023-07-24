import Image from "next/image";
import Link from "next/link";

type VideoDetails = {
  video_id: string;
  video_name: string;
};

type VideoCategory = {
  category_name: string;
  array_to_json: Array<VideoDetails>;
};

type Page = {
  data: Array<VideoCategory>;
};

type Props = {
  imageURL?: string;
  page: Page;
  videoData?: any;
  pageSlug?: string;
};

export default async function MainSection({
  imageURL,
  page,
  videoData,
  pageSlug,
}: Props) {
  return (
    <>
      <div className="text-center">
        {imageURL && (
          <Image
            src={imageURL}
            alt="hero image"
            width={500}
            height={500}
            className="hero-image"
          />
        )}
      </div>
      <div className="flex flex-col py-2 gap-6">
        {page.data.map((section: any) => (
          <div key={section.id}>
            <h2 className="py-2">{section.attributes.category_name}</h2>
            <div className="flex flex-row gap-3 py-3 overflow-x-auto">
              {section.attributes.video_details.data.map((video: any) => {
                const videoPopulated = videoData.find(
                  (v: any) => v.id === video.id
                );
                const videoThumbnail =
                  videoPopulated.attributes.thumbnail?.data?.attributes?.url ??
                  `https://image.mux.com/${videoPopulated?.attributes?.mux_video?.data?.attributes?.playback_id}/thumbnail.jpg?time=0`;
                return (
                  <Link
                    key={video.id}
                    href={`/${pageSlug}/${video.attributes.slug}`}
                    prefetch={true}
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
