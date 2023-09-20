import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { fetchAPI } from "./utils/fetch-api";
import Navbar from "./components/NavBar";
import { FALLBACK_SEO } from "./utils/constants";
import Footer from "./components/Footer";
import { Providers } from "./providers";
import Script from "next/script";
import AgeGateModal from "./components/AgeGateModal";

const inter = Inter({ subsets: ["latin"] });

async function getGlobal(): Promise<any> {
  // const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  // if (!token)
  //   throw new Error("The Strapi API Token environment variable is not set.");
  // const options = { headers: { Authorization: `Bearer ${token}` } };

  const path = `/global`;

  const urlParamsObject = {
    populate: [
      // "metadata.shareImage",
      // "favicon",
      "navigation.links",
      "navigation.logo.logoText",
      "footer.footerLogo.logoText",
      "footer.footerColumns",
      "footer.footerColumns.columnLinks",
      "footer.disclaimer",
      "footer.footerForm",
      "footer.externalImage",
      "footer.socialLinks",
    ],
  };
  return await fetchAPI(path, urlParamsObject, {});
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getGlobal();

  if (!meta.data.attributes.metadata) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  // const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    // icons: {
    //   icon: [new URL(url, getStrapiURL())],
    // },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const global = await getGlobal();
  if (!global.data) return null;

  const { navigation: navbar, footer } = global.data.attributes;
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body>
        <Providers>
          <AgeGateModal
            logoUrl={navbar.logo.logoImg}
            logoText={navbar.logo.logoText}
          />
          <Navbar
            links={navbar.links}
            logoUrl={navbar.logo.logoImg}
            logoText={navbar.logo.logoText}
          />

          <main className="container mx-auto min-h-[60vh] overflow-x-hidden px-6">
            {children}
          </main>
          <Footer
            logoUrl={footer.footerLogo.logoImg}
            logoText={footer.footerLogo.logoText}
            socialLinks={footer.socialLinks}
            footerColumns={footer.footerColumns}
            footerForm={footer.footerForm}
            externalImage={footer.externalImage}
            disclaimer={footer.disclaimer}
          />
        </Providers>
        <Script
          src="https://js.hsforms.net/forms/embed/v2.js"
          id="form-script"
        />
      </body>
    </html>
  );
}
