import React from "react";
import Link from "next/link";
import Image from "next/image";
import BrowseByStateCarousel from "./BrowseByStateCarousel";

export default function BrowseByBrandSection({ brands }: { brands: any }) {
  return (
    <div className="px-4 flex flex-col">
      <h2 className="py-2 section-heading">Browse products by brand</h2>
      <div className="pt-2 pb-14">
        <BrowseByStateCarousel autoplay infinite>
          {brands.map((brand: any) => {
            return (
              <Link key={brand.id} href={`/review/${brand?.attributes?.slug}`}>
                <div className="flex flex-col items-start justify-between gap-2">
                  <div
                    style={{
                      width: "max-content",
                    }}
                  >
                    <Image
                      src={brand?.attributes?.imageUrl}
                      alt={`featured brand link to ${brand?.attributes?.slug}`}
                      className="thumbnail-image"
                      width={230}
                      height={150}
                    />
                  </div>
                  {/* <p className="video-name">{state.category_name}</p> */}
                </div>
              </Link>
            );
          })}
        </BrowseByStateCarousel>
      </div>
    </div>
  );
}
