"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDevice } from "../hooks";
import ReactSlickCarousel, {
  CustomArrow,
  CustomDot,
} from "./ReactSlickCarousel";

const responsive = [
  {
    breakpoint: 1440,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4,
    },
  },
  {
    breakpoint: 1280,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
    },
  },
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 760,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

const defaultSettings = {
  responsive,
};

export default function BrowseByStateCarousel({
  autoplay = false,
  infinite = false,
  children,
}: {
  autoplay?: boolean;
  infinite?: boolean;
  children: React.ReactNode;
}) {
  const { isSmallDevice } = useDevice();

  const [offset, setOffset] = useState<null | number>(null);
  const [settings, setSettings] = useState<any>(defaultSettings);

  const handleResize = () => {
    if (window.innerWidth >= 1440) {
      setOffset(4);
    } else if (window.innerWidth >= 1280) {
      setOffset(3);
    } else if (window.innerWidth >= 1024) {
      setOffset(2);
    } else if (window.innerWidth >= 760) {
      setOffset(2);
    } else if (window.innerWidth >= 540) {
      setOffset(2);
    } else {
      setOffset(1);
    }
  };

  // compute offset depending on the number of slides to show according to the breakpoint
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const JSSettings = {
      dots: true,
      infinite,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      draggable: false,
      nextArrow: <CustomArrow type="next" offset={offset} infinite />,
      prevArrow: <CustomArrow type="prev" infinite />,
      responsive,
      autoplay,
      autoplaySpeed: 3000,
    };
    setSettings({ ...JSSettings });
  }, [offset]);

  if (isSmallDevice) {
    return (
      <div className="flex flex-row gap-3 py-3 overflow-x-auto hidescroll">
        {children}
      </div>
    );
  }

  return (
    <ReactSlickCarousel settings={settings}>{children}</ReactSlickCarousel>
  );
}
