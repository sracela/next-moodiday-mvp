import Link from "next/link";
import ReviewForm from "../components/ReviewForm";
import UploadForm from "../components/UploadForm";
import { CREATORS } from "../utils/constants";

export default function BudtenderNetwork() {
  return (
    <div className="mt-4 flex flex-col">
      <div>
        <h1 className="py-2 heading text-center">Creator Portal</h1>
      </div>
      <div className="flex flex-col mt-5 mx-auto w-full justify-center items-center align-start">
        <div className="mainVideoContainer">
          <video width="100%" controls autoPlay={true} playsInline muted loop>
            <source
              src="https://moodiday.nyc3.cdn.digitaloceanspaces.com/moodiday/Spotlight/Moodi%20Day%20Creator%20Spotlight.mp4"
              type="video/mp4"
            />
          </video>
          <div className="creatorLinkWrapper my-2">
            {CREATORS.map((creator, index) => {
              return (
                <>
                  <Link href={"/creator/" + creator.slug} key={creator.id}>
                    <span>{creator.name}</span>
                  </Link>
                  {index !== CREATORS.length - 1 && <span>|&nbsp;</span>}
                </>
              );
            })}
          </div>
        </div>
        <div className="generalFormContainer mt-5">
          <UploadForm />
        </div>
      </div>
    </div>
  );
}
