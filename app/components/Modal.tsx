import React from "react";
import Image from "next/image";
import { getVideoDataBySlug } from "../utils/api";
import Player from "./Player";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default async function Modal({
  pageSlug,
  videoSlug,
}: {
  pageSlug: string;
  videoSlug: string;
}) {
  if (!videoSlug) return null;
  const videoData = await getVideoDataBySlug(videoSlug);
  const video = videoData[0];

  //   const videoThumbnail =
  //     video?.attributes?.thumbnail?.data?.attributes?.url ??
  //     `https://image.mux.com/${video?.attributes?.mux_video?.data?.attributes?.playback_id}/thumbnail.jpg?time=0`;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="flex justify-center items-center relative z-10 bg-white rounded-lg overflow-hidden transform transition-all modal-box">
          <article className="modal-box-inner">
            <h1 style={{ display: "none" }}>{video?.attributes?.video_name}</h1>
            <section className="player-wrapper">
              {/* <Image
                src={videoThumbnail}
                alt={video?.attributes?.title}
                className="thumbnail-image"
                width={165}
                height={273}
              /> */}
              <Player
                playbackId={
                  video?.attributes?.mux_video?.data?.attributes?.playback_id
                }
                videoName={video?.attributes?.video_name}
                videoId={video?.id}
              />
            </section>
            <section className="description-wrapper">
              <ReactMarkdown>
                {video?.attributes.rich_description}
              </ReactMarkdown>
            </section>
          </article>
          <button className="close-btn">
            <Link href={`/${pageSlug !== "Home" ? pageSlug : ""}`}>
              <Image
                src={"/cross.png"}
                alt="close modal"
                width={20}
                height={20}
              />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
