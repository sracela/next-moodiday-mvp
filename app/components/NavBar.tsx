"use client";
import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useScroll } from "../hooks";
import { SearchBox } from "react-instantsearch-hooks-web";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname();

  return (
    <li className={`flex`}>
      <Link
        href={url}
        className={`flex items-center border border-solid border-black-200 navlink ${
          path === url
            ? "bg-primary border-transparent hover:bg-primary"
            : "transparent"
        }`}
        prefetch={true}
      >
        {text}
      </Link>
    </li>
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
  const isScrolling = useScroll();

  return (
    <div
      className={`bg-white px-4 py-2 sticky top-0 ${
        isScrolling ? "shadow-md" : ""
      }`}
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

        <div className="searchBox">
          <SearchBox
            placeholder="Search for products"
            classNames={{
              input: "navSearch",
              submit: "searchBtn",
              reset: "clearBtn",
              form: "searchForm",
            }}
            onSubmit={(event) => {
              event.preventDefault();
              console.log("submit");
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

        <button className="p-4 lg:hidden">
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
        </button>
      </div>
    </div>
  );
}
