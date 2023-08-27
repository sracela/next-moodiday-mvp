"use client";
import React, { useEffect } from "react";

export default function RemoveScroll() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return <></>;
}
