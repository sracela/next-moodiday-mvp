"use client";
import React, { useEffect } from "react";
import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useScroll } from "../hooks";
import { SearchBox } from "react-instantsearch-hooks-web";
import { useRouter } from "next/navigation";
import { useSsrProvider } from "./providers/SsrProvider";

interface NavLink {
  id?: number;
  url: string;
  newTab?: boolean;
  label: string;
  active?: boolean;
}

export function NavLink({ url, label, active }: NavLink) {
  const path = usePathname();

  return (
    <li className={`flex`}>
      <Link
        href={url}
        className={`flex items-center border border-solid border-black-200 navlink ${
          path === url || active
            ? "bg-primary border-transparent hover:bg-primary"
            : "transparent"
        }`}
        prefetch={true}
      >
        {label}
      </Link>
    </li>
  );
}

function NavMenuMobile({ links }: { links: Array<NavLink> }) {
  const path = usePathname();
  return (
    <div className="mobileMenu p-8 shadow-md">
      <ul className="flex flex-col space-y-4">
        {links.map(({ id, url, label }) => (
          <li key={id} className={`flex`}>
            <Link
              href={url}
              className={`flex hover:text-black ${
                path === url ? "text-black" : "text-black-500"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Navbar({
  links,
  logoUrl,
  logoText,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
}) {
  const hasMounted = useSsrProvider();
  const isScrolling = useScroll();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (path.includes("search")) return;
    const navSearch: HTMLButtonElement | null =
      document.querySelector(".navSearch");
    const clearButton: HTMLButtonElement | null =
      document.querySelector(".clearBtn");
    if (clearButton && navSearch) {
      clearButton.click();
      navSearch.value = "";
      navSearch.blur();
    }
  }, [path]);

  return (
    <div
      className={`bg-white px-4 py-2 sticky top-0 ${
        isScrolling ? "shadow-md" : ""
      } z-20`}
    >
      <div className="container flex justify-between h-16 mx-auto px-0 sm:px-6">
        <Logo src={logoUrl}>
          {logoText && (
            <h2 className="text-2xl font-bold whitespace-nowrap">{logoText}</h2>
          )}
        </Logo>

        <div className="items-center flex-shrink-0 hidden lg:flex">
          <ul className="items-stretch hidden space-x-3 lg:flex">
            {links.map((item: NavLink) => (
              <NavLink key={item.id} {...item} />
            ))}
          </ul>
        </div>

        {hasMounted && (
          <div className="searchBox flex">
            <SearchBox
              placeholder="Search for products"
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
        )}

        {/* <div className="p-4 pr-0 flex gap-x-1 lg:hidden">
          <button className="px-1 sm:hidden cursor-pointer">
            <Image
              src={"/icon-search-header.svg"}
              alt="reset search"
              width={16}
              height={16}
            />
          </button>
          <button
            className="px-1 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <Image
                src={"/cross.png"}
                alt="reset search"
                width={24}
                height={24}
                style={{ padding: "4px" }}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div> */}
        {/* {isMobileMenuOpen && <NavMenuMobile links={links} />} */}
      </div>
      <div className="overflow-x-auto pb-4 container px-0 mx-auto items-center flex lg:hidden">
        <ul className="items-stretch flex space-x-3 mx-auto text-center lg:hidden">
          {links.map((item: NavLink) => (
            <NavLink key={item.id} {...item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
