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
  page: Page;
  title?: string;
  description?: string;
  imageURL?: string;
  videoData?: any;
  getVideoURL: () => string;
};

export default async function MainSection({
  title,
  description,
  imageURL,
  page,
  getVideoURL,
}: Props) {
  return (
    <>
      <div className="text-center">
        {title && <h1 className="main-heading">{title}</h1>}
        {description && <p className="main-subtitle">{description}</p>}
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
            <h2 className="py-2 section-heading">
              {section.attributes.category_name}
            </h2>
            <div className="flex flex-row gap-3 py-3 overflow-x-auto">
              {section.attributes.video_details.data.map((video: any) => {
                const videoThumbnail =
                  video.attributes.thumbnail?.data?.attributes?.url ??
                  `https://image.mux.com/${video?.attributes?.mux_video?.data?.attributes?.playback_id}/thumbnail.jpg?time=0`;
                return (
                  <Link
                    key={video.id}
                    href={`/${getVideoURL()}/video/${
                      video.attributes.slug
                    }?autoplay=true&mute=false`}
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
