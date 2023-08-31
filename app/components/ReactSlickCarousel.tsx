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
  infinite?: boolean;
};

export function CustomDot(props: any) {
  const { onClick, active } = props;
  return (
    <div
      className={`${
        active ? "bg-primary" : "bg-gray-300"
      } h-2 w-2 rounded-full cursor-pointer`}
      onClick={onClick}
    />
  );
}

export function CustomArrow(props: CustomArrowProps) {
  const {
    className,
    style,
    onClick,
    type,
    currentSlide,
    slideCount,
    offset,
    infinite,
  } = props;
  const getStyles = () => {
    if (infinite) {
      return {
        opacity: 1,
        cursor: "pointer",
      };
    }
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
  settings,
  children,
}: {
  settings: any;
  children: React.ReactNode;
}) {
  return <Slider {...settings}>{children}</Slider>;
}
