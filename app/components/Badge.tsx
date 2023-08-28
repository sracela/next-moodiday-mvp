import Link from "next/link";
import React from "react";

const getColorFromTag = (tag: string) => {
  switch (tag.toLowerCase()) {
    case "sativa":
      return "rgba(247, 243, 227, 0.9)";
    case "indica":
      return "rgba(247, 243, 227, 0.9)";
    case "hybrid":
      return "rgba(247, 243, 227, 0.9)";
    case "disappointed":
      return "#f15931";
    case "mixed":
      return "#ffc901";
    case "enjoyed":
      return "#a8d400";
    case "loved":
      return "#5bbf00";
    case "meh":
      return "#f5924b";
    default:
      return "transparent";
  }
};

export default function Badge({ tag }: { tag: string }) {
  return (
    <Link
      className="badge"
      href={`/search/${tag}`}
      style={{ background: getColorFromTag(tag) }}
    >
      {tag}
    </Link>
  );
}
