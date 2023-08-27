"use client";
import React, { useCallback, useEffect, useState } from "react";
// @ts-ignore: Unreachable code error
import MuxPlayer from "@mux/mux-player-react/lazy";
import { useDevice } from "../hooks";
import { useSearchParams } from "next/navigation";

type PlayerProps = {
  playbackId: string;
  videoName: string;
  videoId: string;
  //   onLoaded: () => void;
};

export default function Player({
  playbackId,
  videoName,
  videoId,
}: PlayerProps) {
  const searchParams = useSearchParams();
  const muted = searchParams.get("muted") === "true";
  const autoplay = searchParams.get("autoplay") === "true";
  const ref = React.useRef<any>(null);

  const onLoaded = () => {
    if (ref.current) {
      ref.current
        .play()
        .then(() => {
          console.log("playing");
        })
        .catch((err: any) => {
          console.log("error playing", err);
        });
    }
  };

  return (
    <MuxPlayer
      ref={ref}
      streamType="on-demand"
      muted={muted}
      playbackId={playbackId}
      poster="/video_load_screen.jpg"
      placeholder="/video_load_screen.jpg"
      onLoadedData={onLoaded}
      metadata={{
        video_id: videoId ?? "NO_ID",
        video_title: videoName ?? "title not available",
      }}
      style={{ aspectRatio: 9 / 16, height: "100%" }}
      autoPlay={autoplay || "muted"}
    />
  );
}
