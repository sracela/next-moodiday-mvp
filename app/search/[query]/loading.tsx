import LoadingGrid from "../../components/LoadingGrid";

export default function Loading() {
  return (
    <div className="w-full flex flex-col py-2 gap-6">
      <div className="w-full px-4">
        <h2 className="py-2 section-heading">Category</h2>
        <div className="w-full pt-2">
          <div className="w-full py-2 video-grid">
            <LoadingGrid count={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
