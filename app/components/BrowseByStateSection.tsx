import React from "react";
import Link from "next/link";
import Image from "next/image";
import BrowseByStateCarousel from "./BrowseByStateCarousel";

export default function BrowseByStateSection({ states }: { states: any }) {
  return (
    <div className="px-2 flex flex-col">
      <h2 className="py-2 section-heading">Browse products by state</h2>
      <div className="pt-2 pb-14">
        <BrowseByStateCarousel>
          {states.map((state: any) => {
            return (
              <Link key={state.id} href={`/search/${state.category_name}`}>
                <div className="flex flex-col items-start justify-between gap-2">
                  <div
                    style={{
                      width: "max-content",
                    }}
                  >
                    <Image
                      src={state.url}
                      alt={state.category_name}
                      className="thumbnail-image"
                      width={230}
                      height={150}
                    />
                  </div>
                  <p className="video-name">{state.category_name}</p>
                </div>
              </Link>
            );
          })}
        </BrowseByStateCarousel>
      </div>
    </div>
  );
}
