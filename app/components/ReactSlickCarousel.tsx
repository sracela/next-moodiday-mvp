"use client";
import React, { use, useEffect, useMemo, useState } from "react";
import Slider from "react-slick";

import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type CustomArrowProps = {
  type: "next" | "prev";
  slideCount?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  currentSlide?: number;
  offset?: number;
};

function CustomArrow(props: CustomArrowProps) {
  const { className, style, onClick, type, currentSlide, slideCount, offset } =
    props;
  const getStyles = () => {
    if (slideCount && offset && type === "next") {
      return {
        opacity: currentSlide === slideCount - offset ? 0.25 : 1,
        cursor: currentSlide === slideCount - offset ? "default" : "pointer",
      };
    } else {
      return {
        opacity: currentSlide === 0 ? 0.25 : 1,
        cursor: currentSlide === 0 ? "default" : "pointer",
      };
    }
  };

  return (
    <div
      className={className}
      style={{
        ...style,
        opacity: getStyles().opacity,
        cursor: getStyles().cursor,
        marginLeft: type === "next" ? 0 : "-1rem",
      }}
      onClick={onClick}
    >
      <Image
        src={type === "next" ? "/arrow-right.png" : "/arrow-left.png"}
        alt={`${type} arrow`}
        width={20}
        height={20}
      />
    </div>
  );
}

export default function ReactSlickCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  const [offset, setOffset] = useState(1);

  // compute offset depending on the number of slides to show according to the breakpoint
  useEffect(() => {
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
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  var settings = useMemo(
    () => ({
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      draggable: false,
      nextArrow: <CustomArrow type="next" offset={offset} />,
      prevArrow: <CustomArrow type="prev" />,
      responsive,
    }),
    [offset]
  );

  return <Slider {...settings}>{children}</Slider>;
}
