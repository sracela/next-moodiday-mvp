"use client";
import { useEffect, useState } from "react";
import ReactSlickCarousel, { CustomArrow } from "./ReactSlickCarousel";
import { useDevice } from "../hooks";

const responsive = [
  {
    breakpoint: 1440,
    settings: {
      slidesToShow: 6,
      slidesToScroll: 6,
    },
  },
  {
    breakpoint: 1280,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 5,
    },
  },
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
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
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
];

const defaultSettings = {
  responsive,
};

export default function VideoCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobile } = useDevice();

  const [offset, setOffset] = useState<null | number>(null);
  const [settings, setSettings] = useState<any>(defaultSettings);

  const handleResize = () => {
    if (window.innerWidth >= 1440) {
      setOffset(6);
    } else if (window.innerWidth >= 1280) {
      setOffset(5);
    } else if (window.innerWidth >= 1024) {
      setOffset(3);
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
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      draggable: false,
      nextArrow: <CustomArrow type="next" offset={offset} />,
      prevArrow: <CustomArrow type="prev" />,
      responsive,
    };
    setSettings({ ...JSSettings });
  }, [offset]);

  if (isMobile) {
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
