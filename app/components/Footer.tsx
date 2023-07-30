"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import {
  AiFillTwitterCircle,
  AiFillYoutube,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import { useEffect } from "react";
import React from "react";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface BudtenderNetworkLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex text-center md:text-left">
      <Link
        href={url}
        className={`hover:dark:text-violet-400 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function BudtenderNetworkLink({ attributes }: BudtenderNetworkLink) {
  return (
    <li className="flex text-center md:text-left">
      <Link href={`/${attributes.slug}`} className="hover:dark:text-violet-400">
        {attributes.name}
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
  menuLinks,
  budtenderNetworkyLinks,
  legalLinks,
  socialLinks,
}: {
  logoUrl: string | null;
  logoText: string | null;
  menuLinks: Array<FooterLink>;
  budtenderNetworkyLinks: Array<BudtenderNetworkLink>;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
}) {
  const formRef = React.useRef<HTMLDivElement>(null);
  const script = document.createElement("script");
  script.src = "https://js.hsforms.net/forms/embed/v2.js";
  script.id = "form-script";

  useEffect(() => {
    if (!formRef.current) return;
    if (document.querySelector("#form-script")) return;
    document.querySelector("#hbspt")?.appendChild(script);
    script.addEventListener("load", () => {
      // @ts-ignore
      window.hbspt.forms.create({
        region: "na1",
        portalId: "22398621",
        formId: "2d92060c-cd73-42e2-b932-942b5cfda52d",
      });
    });
  }, [formRef.current]);

  return (
    <footer className="py-6">
      <div className="container px-6 mx-auto space-y-6  md:space-y-12">
        <div className="pt-4 grid grid-cols-12">
          <div className="col-span-12 md:col-span-6">
            <h1 className="pt-2 pb-1 text-lg font-medium font-logo">
              Can&apos;t find the review you need? Request it!
            </h1>
            <p>
              Our budtender network will review it and email you when it&apos;s
              ready.
            </p>

            <div id="hbspt" ref={formRef} className="pt-5" />
          </div>
          <div className="col-span-6 pl-8 hidden md:flex">
            <video width="100%" controls autoPlay={true} playsInline muted loop>
              <source
                src="https://moodiday.nyc3.cdn.digitaloceanspaces.com/moodiday/Spotlight/Moodi%20Day%20Creator%20Spotlight.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
        <div className="pt-4 grid grid-cols-12">
          <div className="pb-6 col-span-12 text-center flex items-start justify-center sm:-ml-2 sm:justify-start md:pb-0 md:col-span-3 ">
            <Logo src={logoUrl}>
              {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
            </Logo>
          </div>

          <div className="col-span-12 text-center pb-4 sm:pb-0 sm:text-left sm:col-span-4 md:col-span-3">
            <p className="pt-2 pb-1 text-md font-medium font-logo">
              Budtender Network
            </p>
            <ul className="flex flex-col justify-center items-center sm:items-start">
              {budtenderNetworkyLinks.map((link: BudtenderNetworkLink) => (
                <BudtenderNetworkLink key={link.id} {...link} />
              ))}
            </ul>
          </div>

          <div className="col-span-12 text-center pb-4 sm:pb-0 sm:text-left sm:col-span-4 md:col-span-3">
            <p className="pt-2 pb-1 text-md font-medium font-logo">
              Categories
            </p>
            <ul className="flex flex-col justify-center items-center sm:items-start">
              {menuLinks.map((link: FooterLink) => (
                <FooterLink key={link.id} {...link} />
              ))}
            </ul>
          </div>
          <div className="col-span-12 text-center pb-4 sm:pb-0 sm:text-left sm:col-span-4 md:col-span-3">
            <p className="pt-2 pb-1 text-md font-medium font-logo">Legal</p>
            <ul className="flex flex-col justify-center items-center sm:items-start">
              {legalLinks.map((link: FooterLink) => (
                <FooterLink key={link.id} {...link} />
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-4">
          <p>
            <strong>Disclaimer:</strong>
          </p>
          <p className="mt-2">
            <i>
              These products are not intended to diagnose, treat, cure or
              prevent any disease. All information presented here is not meant
              as a substitute for or alternative to information from healthcare
              practitioners. Please consult your healthcare professional about
              potential interactions or other possible complications before
              using any product. Effects & Medical Attributes are based on
              anecdotal evidence. Individual experiences can be varied.
            </i>
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
                    title={link.text}
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
