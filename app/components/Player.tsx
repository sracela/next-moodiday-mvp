"use client";
import React, { useCallback, useState } from "react";
// @ts-ignore: Unreachable code error
import MuxPlayer from "@mux/mux-player-react";
import { useDevice } from "../hooks";

type PlayerProps = {
  playbackId: string;
  videoName: string;
  videoId: string;
  //   muted: boolean;
  //   onLoaded: () => void;
  //   autoplay: boolean;
};

export default function Player({
  playbackId,
  videoName,
  videoId,
}: PlayerProps) {
  const ref = React.useRef<any>(null);
  const { isMobile } = useDevice();
  const [isMuted, setIsMuted] = useState(isMobile);

  return (
    <MuxPlayer
      ref={ref}
      streamType="on-demand"
      muted={isMuted}
      autoPlay={!isMobile}
      playbackId={playbackId}
      poster="/video_load_screen.jpg"
      placeholder="/video_load_screen.jpg"
      //   onLoadedData={onLoaded}
      metadata={{
        video_id: videoId ?? "NO_ID",
        video_title: videoName ?? "title not available",
      }}
      style={{ aspectRatio: 9 / 16, height: "100%" }}
    />
  );
}
