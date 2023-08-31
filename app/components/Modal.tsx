import React from "react";
import Player from "./Player";
import ReactMarkdown from "react-markdown";
import CloseModalButton from "./CloseModalButton";
import RemoveScrollComponent from "./RemoveScrollComponent";

export default function Modal({ video }: { video: any }) {
  return (
    <div className="fixed z-50 inset-0 min-h-screen overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen relative">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-background-overflow opacity-75"></div>
        </div>
        <div className="flex justify-center items-center relative bg-white rounded-lg transform transition-all modal-box">
          {video && video?.[0] && (
            <article className="modal-box-inner">
              <h1 style={{ display: "none" }}>
                {video[0]?.attributes?.video_name}
              </h1>
              <section className="player-wrapper">
                <Player
                  playbackId={
                    video[0].attributes?.mux_video?.data?.attributes
                      ?.playback_id
                  }
                  videoName={video[0].attributes?.video_name}
                  videoId={video[0].id}
                />
              </section>
              <section className="description-wrapper">
                <ReactMarkdown>
                  {video[0].attributes.rich_description}
                </ReactMarkdown>
              </section>
            </article>
          )}
          <CloseModalButton />
        </div>
      </div>
      <RemoveScrollComponent />
    </div>
  );
}
