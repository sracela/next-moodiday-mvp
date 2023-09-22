"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SearchBox } from "react-instantsearch";

export default function MoodiSearchBox() {
  const router = useRouter();
  return (
    <div className="w-1/3 sm:w-1/2 md:w-full px-4 py-2 fixed top-0 right-0 z-20 pointer-events-none">
      <div className="container flex justify-end h-16 mx-auto px-0 sm:px-6">
        <div className="searchBox pointer-events-auto">
          <SearchBox
            placeholder="Search for a product"
            classNames={{
              input: "navSearch",
              submit: "searchBtn",
              reset: "clearBtn",
              form: "searchForm",
            }}
            //navigate to search page
            onSubmit={(event: any) => {
              event.preventDefault();

              const searchQuery = event.target[0].value;
              if (searchQuery) {
                router.push(`/search/${searchQuery}`);
              }
            }}
            searchAsYouType={false}
            submitIconComponent={() => (
              <Image
                src={"/icon-search-header.svg"}
                alt="reset search"
                width={14}
                height={14}
              />
            )}
            resetIconComponent={() => (
              <Image
                src={"/cross.png"}
                alt="reset search"
                width={10}
                height={10}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
