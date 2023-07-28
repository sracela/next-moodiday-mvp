import ReviewForm from "../components/ReviewForm";

export default function BudtenderNetwork() {
  return (
    <div className="mt-4 flex flex-col">
      <div>
        <h1 className="py-2 heading text-center">
          Remote Cannabis Reviewer / Budtender
          <br /> Job Application Form
        </h1>
      </div>
      <div className="flex mt-12 mx-auto w-full justify-around align-start">
        <div className="leftVideo">
          <video width="100%" controls autoPlay={true} playsInline muted loop>
            <source
              src="https://moodiday.nyc3.cdn.digitaloceanspaces.com/moodiday/BudtenderNetworkMarketing/Moodi%20Day%20Budtender%20Network%20Video.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="rightText text-center">
          <h2 className="mt-4 heading2">Make extra cash reviewing cannabis!</h2>
          <p className="p-spaciated">
            To qualify for the Moodi Day budtender network, you must:
          </p>
          <p className="p-spaciated">
            (1) live in a U.S. state where cannabis is legal;
          </p>
          <p className="p-spaciated">(2) be 21+ years old; and</p>
          <p className="p-spaciated">
            (3) currently work in the legal cannabis industry.
          </p>
          <p className="p-spaciated">Join the movement below.</p>
          <div className="reviewsForm">
            <ReviewForm />
          </div>
        </div>
      </div>
    </div>
  );
}
