import { getPageBySlug } from "./utils/get-page-by-slug";

export default async function Home() {
  const homePage = await getPageBySlug("home");
  console.log(homePage);
  if (homePage.data.length === 0) return null;
  return (
    <>
      <div className="text-center">
        <h1 className="main-heading">Community-Powered Cannabis</h1>
        <p className="main-subtitle">
          Verified reviews from real buds, not bots
        </p>
      </div>
      <div className="flex flex-col py-2 gap-6">
        {homePage.data.map((section: any) => (
          <div key={section.category_name}>
            <h2 className="py-2">{section.category_name}</h2>
            {/* div below has to have no-wrap overflow-x: scroll */}
            <div className="flex flex-row gap-3 py-3 overflow-x-auto">
              {section.array_to_json.map((video: any) => (
                <div
                  key={video.video_id}
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
                  <p>{video.video_name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
