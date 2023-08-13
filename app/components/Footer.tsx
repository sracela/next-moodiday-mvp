"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import React from "react";
import HubspotContactForm from "./HubspotFooterForm";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  label: string;
  social?: string;
}

type FooterColumn = {
  id: number;
  title: string;
  columnLinks: Array<FooterLink>;
};
type FooterForm = {
  title: string;
  description: string;
};
type Disclaimer = {
  title: string;
  description: string;
};
type ExternalImage = {
  src: string;
  altText: string;
};

function FooterLink({ url, label }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex text-center md:text-left">
      <Link
        href={url}
        className={`flex hover:text-black ${
          path === url ? "text-black" : "text-black-500"
        }`}
      >
        {label}
      </Link>
    </li>
  );
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
  switch (social) {
    case "INSTAGRAM":
      return <AiFillInstagram />;
    case "TWITTER":
      return <AiFillTwitterCircle />;
    case "FACEBOOK":
      return <AiFillFacebook />;
    default:
      return null;
  }
}

export default function Footer({
  logoUrl,
  logoText,
  footerColumns,
  socialLinks,
  footerForm,
  externalImage,
  disclaimer,
}: {
  logoUrl: string | null;
  logoText: string | null;
  socialLinks: Array<FooterLink>;
  footerColumns?: Array<FooterColumn>;
  footerForm?: FooterForm;
  externalImage?: ExternalImage;
  disclaimer: Disclaimer;
}) {
  return (
    <footer className="py-6">
      <div className="container px-6 mx-auto space-y-6  md:space-y-12">
        <div className="pt-4 grid grid-cols-12">
          <div className="col-span-12 md:col-span-6">
            <h1 className="pt-2 pb-1 text-lg font-medium font-logo">
              {footerForm?.title}
            </h1>
            <p>{footerForm?.description}</p>
            <HubspotContactForm />
          </div>
          <div className="col-span-6 pl-8 hidden md:flex">
            <video width="100%" controls autoPlay={true} playsInline muted loop>
              <source src={externalImage?.src} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="pt-4 grid grid-cols-12">
          <div className="pb-6 col-span-12 text-center flex items-start justify-center sm:-ml-2 sm:justify-start md:pb-0 md:col-span-3 ">
            <Logo src={logoUrl}>
              {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
            </Logo>
          </div>
          {footerColumns?.map((column) => (
            <div
              key={column.id}
              className="col-span-12 text-center pb-4 sm:pb-0 sm:text-left sm:col-span-4 md:col-span-3"
            >
              <p className="pt-2 pb-1 text-md font-medium font-logo">
                {column.title}
              </p>
              <ul className="flex flex-col justify-center items-center sm:items-start">
                {column.columnLinks.map((link: FooterLink) => (
                  <FooterLink key={link.id} {...link} />
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-4">
          <p>
            <strong>{disclaimer.title}</strong>
          </p>
          <p className="mt-2">
            <i>{disclaimer.description}</i>
          </p>
          <div className="grid justify-center pt-6 lg:justify-between">
            <div className="flex">
              <span className="mr-2">
                ©{new Date().getFullYear()} Moodi Day, All rights reserved
              </span>
            </div>
            <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
              {socialLinks.map((link: FooterLink) => {
                return (
                  <a
                    key={link.id}
                    rel="noopener noreferrer"
                    href={link.url}
                    title={link.label}
                    target={link.newTab ? "_blank" : "_self"}
                    className="flex items-center justify-center w-10 h-10 rounded-full"
                  >
                    <RenderSocialIcon social={link.social} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
