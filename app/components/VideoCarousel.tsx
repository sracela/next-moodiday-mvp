"use client";
import React, { use, useEffect, useLayoutEffect } from "react";
import { useDevice } from "../hooks";
import ReactSlickCarousel from "./ReactSlickCarousel";

export default function VideoCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSmallDevice } = useDevice();
  // search in a useEffect all the elements with classname js-disabled and set them to display: none
  // useLayoutEffect(() => {
  //   const elements = document.getElementsByClassName("js-disabled");
  //   for (let i = 0; i < elements.length; i++) {
  //     elements[i].setAttribute("style", "display: none");
  //   }
  // }, []);

  if (isSmallDevice) {
    return (
      <div className="flex flex-row gap-3 py-3 overflow-x-auto hidescroll">
        {children}
      </div>
    );
  }

  return <ReactSlickCarousel>{children}</ReactSlickCarousel>;
}
