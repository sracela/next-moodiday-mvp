import React from "react";

export default function CardSkeleton({ id }: { id: string }) {
  return (
    <div className="loading" key={id}>
      <div className="image"></div>
      <div className="h4"></div>
      {/* <div className="description"></div> */}
    </div>
  );
}
