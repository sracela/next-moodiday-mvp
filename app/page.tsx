import Image from "next/image";
import { getPageBySlug } from "./utils/api";
import Link from "next/link";
import MainSection from "./components/MainSection";

export default async function Home() {
  const slug = "Home";
  const { pageData: homePage } = await getPageBySlug(slug);
  if (!homePage || homePage.data.length === 0) return null;
  return (
    <>
      <MainSection
        title="Community-Powered Cannabis"
        description="Verified reviews from real buds, not bots"
        page={homePage}
        imageURL={
          "https://moodiday.nyc3.digitaloceanspaces.com/moodiday/e5bb3bc88700d2d11fe403cba149ae0a.svg"
        }
        getVideoURL={() => "home"}
      />
    </>
  );
}
