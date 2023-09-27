import NotFound from "@/app/not-found";
import { REVIEW_INVITE_BRANDS } from "@/app/utils/constants";

type Props = {
  params: {
    pageSlug: string;
  };
};

const getBrandData = (slug: string) => {
  return REVIEW_INVITE_BRANDS.find((d: any) => d.slug === slug);
};
export default function ReviewInvite({ params }: Props) {
  const { pageSlug } = params;

  const brandData = getBrandData(pageSlug);
  if (!brandData) {
    return <NotFound />;
  }

  return (
    <div className="mt-4 flex flex-col">
      <div>
        <h1 className="py-2 heading text-center">
          {brandData.name} Review Invite
        </h1>
      </div>
      <div className="flex flex-col mt-5 mx-auto w-full justify-center items-center align-start">
        <div className="mainVideoContainer">
          <video width="100%" controls autoPlay={true} playsInline muted loop>
            <source
              src={brandData.video.data.attributes.url}
              type="video/mp4"
            />
          </video>
        </div>
        <div className="generalFormContainer mt-5">
          <iframe
            id={brandData.form.id}
            title={brandData.form.title}
            allowTransparency={true}
            allowFullScreen={true}
            allow="geolocation; microphone; camera"
            src={brandData.form.src}
            frameBorder="0"
            style={{
              minWidth: "100%",
              maxWidth: "100%",
              height: "539px",
              border: "none",
            }}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}
