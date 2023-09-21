"use client";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { useLayoutEffect, useState } from "react";
import { Configure, InstantSearch } from "react-instantsearch";
import { AgeGateProvider } from "./components/providers/AgeGateProvider";

const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST!,
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useLayoutEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <AgeGateProvider>{children}</AgeGateProvider>;
  }

  return (
    <AgeGateProvider>
      {searchClient && (
        <InstantSearch searchClient={searchClient} indexName="video-detail">
          {children}
          <Configure hitsPerPage={18} />
        </InstantSearch>
      )}
    </AgeGateProvider>
  );
}
