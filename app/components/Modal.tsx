import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getVideoDataBySlug } from "../utils/api";

export default async function Modal({ videoSlug }: { videoSlug: string }) {
  const videoData = await getVideoDataBySlug(videoSlug);
  const video = videoData[0];
  console.log(video);
  const videoThumbnail =
    video?.attributes?.thumbnail?.data?.attributes?.url ??
    `https://image.mux.com/${video?.attributes?.mux_video?.data?.attributes?.playback_id}/thumbnail.jpg?time=0`;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="flex justify-center items-center relative z-10 bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
          <div
            key={video.id}
            className="flex flex-col items-start justify-between gap-2"
          >
            <div
              style={{
                width: "max-content",
              }}
            >
              <Image
                src={videoThumbnail}
                alt={video?.attributes?.title}
                className="thumbnail-image"
                width={165}
                height={273}
              />
            </div>
            <p>{video?.attributes?.video_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
