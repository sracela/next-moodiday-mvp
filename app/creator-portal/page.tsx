import Link from "next/link";
import ReviewForm from "../components/ReviewForm";
import UploadForm from "../components/UploadForm";

export default function BudtenderNetwork() {
  return (
    <div className="mt-4 flex flex-col">
      <div>
        <h1 className="py-2 heading text-center">Creator Portal</h1>
      </div>
      <div className="flex flex-col mt-5 mx-auto w-full justify-center items-center align-start">
        <div className="creatorPortal">
          <video width="100%" controls autoPlay={true} playsInline muted loop>
            <source
              src="https://moodiday.nyc3.cdn.digitaloceanspaces.com/moodiday/Spotlight/Moodi%20Day%20Creator%20Spotlight.mp4"
              type="video/mp4"
            />
          </video>
          <div className="creatorLinkWrapper my-2">
            <Link href="/creator/rachaelb">
              <span>Rachael B.</span>
            </Link>
            |&nbsp;
            <Link href="/creator/daltonm">
              <span>Dalton M.</span>
            </Link>
            |&nbsp;
            <Link href="/creator/ericg">
              <span>Eric G.</span>
            </Link>
            |&nbsp;
            <Link href="/creator/kerrys">
              <span>Kerry S.</span>
            </Link>
            |&nbsp;
            <Link href="/creator/katiet">
              <span>Katie T.</span>
            </Link>
            |&nbsp;
            <Link href="/creator/ritzg">
              <span>Ritz G.</span>
            </Link>
          </div>
        </div>
        <div className="creatorPortalForm mt-5">
          <UploadForm />
        </div>
      </div>
    </div>
  );
}
