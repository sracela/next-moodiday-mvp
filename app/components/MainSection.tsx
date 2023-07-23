import Image from "next/image";

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
};

export default async function PageRoute({ imageURL, page }: Props) {
  console.log(imageURL);
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
            {/* div below has to have no-wrap overflow-x: scroll */}
            <div className="flex flex-row gap-3 py-3 overflow-x-auto">
              {section.attributes.video_details.data.map((video: any) => (
                <div
                  key={video.id}
                  className="flex flex-col items-start justify-between gap-2"
                >
                  <div
                    style={{
                      borderRadius: "15px",
                      width: "165px",
                      height: "273px",
                      backgroundColor: "#e5c9a2",
                    }}
                  />
                  <p>{video.attributes.video_name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
