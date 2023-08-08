"use client";
import React, { useCallback, useEffect, useState } from "react";
// @ts-ignore: Unreachable code error
import MuxPlayer from "@mux/mux-player-react/lazy";
import { useDevice } from "../hooks";

type PlayerProps = {
  playbackId: string;
  videoName: string;
  videoId: string;
  muted?: boolean;
  autoplay?: boolean;
  //   onLoaded: () => void;
};

export default function Player({
  playbackId,
  videoName,
  videoId,
  muted,
  autoplay,
}: PlayerProps) {
  const ref = React.useRef<any>(null);
  const { isMobile } = useDevice();

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
