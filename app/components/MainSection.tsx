import Image from "next/image";
import Link from "next/link";
import VideoCarousel from "./VideoCarousel";
import Badge from "./Badge";
import { NavLink } from "./NavBar";
import BrowseByStateSection from "./BrowseByStateSection";
import BrowseByBrandSection from "./BrowseByBrandSection";

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

type PageConfig = {
  data: {
    id: string;
    attributes: {
      tag_name: string;
      sort_order: string | null;
      hero_text: string | null;
      hero_position: number | null;
      quick_pic_position: number | null;
      brand_carousel_position: number | null;
    };
  };
};

type Props = {
  page: Page;
  pageConfig?: PageConfig;
  states?: any;
  brands?: any;
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
  pageConfig,
  states,
  brands,
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
            width={1260}
            height={200}
            className="hero-image"
            priority
          />
        )}
      </div>
      <div className="flex flex-col py-2 gap-6 sm:px-8">
        {page.data.map((section: any, index: number) => {
          const browseByStatePosition =
            pageConfig?.data?.attributes?.quick_pic_position || null;

          const browseByBrandPosition =
            pageConfig?.data?.attributes?.brand_carousel_position || null;
          return (
            <>
              {browseByStatePosition && browseByStatePosition - 1 === index && (
                <BrowseByStateSection states={states} />
              )}

              {browseByBrandPosition && browseByBrandPosition - 1 === index && (
                <BrowseByBrandSection brands={brands} />
              )}
              {section.attributes.video_details.data.length > 0 && (
                <div key={section.id} className="px-2 flex flex-col">
                  <h2 className="py-2 section-heading">
                    {section.attributes.category_name}
                  </h2>
                  <div className="w-full flex justify-end sm:pr-12 sm:pb-2">
                    <NavLink
                      label="View All"
                      url={`/viewAll/${section.attributes.category_name}`}
                      active
                    />
                  </div>
                  <div className="pt-2">
                    <VideoCarousel>
                      {section.attributes.video_details.data.map(
                        (video: any) => {
                          const videoThumbnail =
                            video.attributes.thumbnail?.data?.attributes?.url ??
                            `https://image.mux.com/${video?.attributes?.mux_video?.data?.attributes?.playback_id}/thumbnail.jpg?time=0`;

                          return (
                            // <Link
                            //   key={video.id}
                            //   href={`/${getVideoURL()}/video/${
                            //     video.attributes.slug
                            //   }?autoplay=true&mute=false`}
                            // >
                            <div key={video.id}>
                              <div className="flex flex-col items-start justify-between gap-2">
                                <div
                                  style={{
                                    width: "max-content",
                                    position: "relative",
                                  }}
                                >
                                  {video.attributes.subcategories && (
                                    <Badge
                                      tag={video.attributes.subcategories}
                                    />
                                  )}

                                  <Link
                                    key={video.id}
                                    href={`/${getVideoURL()}/video/${
                                      video.attributes.slug
                                    }?autoplay=true&mute=false`}
                                  >
                                    <Image
                                      src={videoThumbnail}
                                      alt={video?.attributes.video_name}
                                      className="thumbnail-image"
                                      width={165}
                                      height={273}
                                    />
                                  </Link>
                                </div>

                                <div className="video-name">
                                  <Link
                                    key={video.id}
                                    href={`/${getVideoURL()}/video/${
                                      video.attributes.slug
                                    }?autoplay=true&mute=false`}
                                  >
                                    {video.attributes.video_name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                            // </Link>
                          );
                        }
                      )}
                    </VideoCarousel>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
}
