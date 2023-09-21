"use client";
import { useState } from "react";
import Image from "next/image";
import VideoCardSkeleton from "./VideoCardSkeleton";

export interface CustomImageProps {
  src: string;
  width: number;
  height: number;
  alt: string;
}
export default function CustomImage({
  src,
  width,
  alt,
  height,
}: CustomImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      {isLoading && <VideoCardSkeleton width={width} height={height} />}
      <Image
        src={src}
        alt={alt}
        className="thumbnail-image"
        width={isLoading ? 0 : width}
        height={isLoading ? 0 : height}
        onLoadingComplete={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );
}
