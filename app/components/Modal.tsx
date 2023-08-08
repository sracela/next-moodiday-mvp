"use client";
import React, { useEffect } from "react";
import Player from "./Player";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import { useSearchParams } from "next/navigation";

export default function Modal({
  pageSlug,
  video,
}: {
  pageSlug: string;
  video: any;
}) {
  //   const videoThumbnail =
  //     video?.attributes?.thumbnail?.data?.attributes?.url ??
  //     `https://image.mux.com/${video?.attributes?.mux_video?.data?.attributes?.playback_id}/thumbnail.jpg?time=0`;

  // check if url query has muted and autoplay
  const searchPatams = useSearchParams();
  const muted = searchPatams.get("muted") === "true";
  const autoplay = searchPatams.get("autoplay") === "true";

  useEffect(() => {
    if (!video || !video?.[0]) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!video || !video?.[0]) return null;

  return (
    <div className="fixed z-10 inset-0 min-h-screen overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen relative">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-background-overflow opacity-75"></div>
        </div>
        <div className="flex justify-center items-center relative bg-white rounded-lg transform transition-all modal-box">
          <article className="modal-box-inner">
            <h1 style={{ display: "none" }}>
              {video[0]?.attributes?.video_name}
            </h1>
            <section className="player-wrapper">
              <Player
                playbackId={
                  video[0].attributes?.mux_video?.data?.attributes?.playback_id
                }
                videoName={video[0].attributes?.video_name}
                videoId={video[0].id}
                muted={muted}
                autoplay={autoplay}
              />
            </section>
            <section className="description-wrapper">
              <ReactMarkdown>
                {video[0].attributes.rich_description}
              </ReactMarkdown>
            </section>
          </article>
          <Link href={`/${pageSlug !== "Home" ? pageSlug : ""}`}>
            <button className="close-btn">
              <MdClose size={20} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
