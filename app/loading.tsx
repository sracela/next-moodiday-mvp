import VideoCardSkeleton from "./components/VideoCardSkeleton";

export default function Loading() {
  const numberOfCards = 6;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2 justify-items-center">
      {[...Array(numberOfCards)].map((_, i) => (
        <VideoCardSkeleton key={i} width={165} height={273} />
      ))}
    </div>
  );
}
