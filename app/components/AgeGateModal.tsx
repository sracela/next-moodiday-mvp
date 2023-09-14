"use client";
import React from "react";
import RemoveScrollComponent from "./RemoveScrollComponent";
import { useAgeGateProvider } from "./providers/AgeGateProvider";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import { usePathname } from "next/navigation";

export default function AgeGateModal({
  logoUrl,
  logoText,
}: {
  logoUrl: string;
  logoText: string;
}) {
  const pathname = usePathname();
  const { requiredAge, handleRequiredAgeCookie } = useAgeGateProvider();
  if (
    pathname === "/terms-of-use" ||
    pathname === "/privacy-policy" ||
    requiredAge === "yes"
  )
    return null;
  return (
    <div className="fixed z-50 inset-0 min-h-screen overflow-y-auto">
      <div className="flex items-center justify-center relative">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-white"></div>
        </div>
        {!!requiredAge && (
          <div
            className="mx-3 sm:mx-0 flex flex-col justify-center items-center relative gap-4 max-h-screen"
            style={{ paddingTop: "128px" }}
          >
            <Logo src={logoUrl}>
              {logoText && (
                <h2 className="text-3xl sm:text-4xl font-bold whitespace-nowrap pb-4">
                  {logoText}
                </h2>
              )}
            </Logo>
            <div className="flex flex-col justify-center items-center text-center relative bg-white rounded-lg w-full age-card">
              <div className="text-xl sm:text-2xl font-bold">
                Are you over the age of 21?
              </div>
              <div className="text-md sm:text-lg pt-2 pb-3">
                <p className="leading-6">
                  By clicking &quot;Yes&quot; I certify that <br />
                  I&apos;m over the age of 21
                </p>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row">
                <Button onClick={handleRequiredAgeCookie} className="primary">
                  Yes
                </Button>
                &emsp;
                <Button onClick={() => window.location.reload()}>No</Button>
              </div>
            </div>
            <p className="text-center">
              By accessing this site you accept the{" "}
              <Link href={"/terms-of-use"} className="moodiLink">
                Terms of Use
              </Link>{" "}
              and <br />
              <Link href={"/privacy-policy"} className="moodiLink">
                Privacy Policy
              </Link>
            </p>
          </div>
        )}
      </div>
      <RemoveScrollComponent />
    </div>
  );
}
