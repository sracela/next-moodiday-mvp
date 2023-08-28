import React from "react";
import CardSkeleton from "./CardSkeleton";

export default function LoadingGrid({ count = 12 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} id={i.toString()} />
      ))}
    </>
  );
}
