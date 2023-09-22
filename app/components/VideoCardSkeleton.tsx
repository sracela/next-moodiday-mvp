"use client";
export interface VideoCardSkeletonProps {
  width: number;
  height: number;
}
export default function VideoCardSkeleton({
  width,
  height,
}: VideoCardSkeletonProps) {
  return (
    <div
      className="flex align-bottom justify-center items-end bg-slate-200 animate-pulse rounded-xl"
      style={{ width, height }}
    >
      <div className="bg-slate-300 w-2/3 h-10 animate-pulse mb-9 rounded-md"></div>
    </div>
  );
}
