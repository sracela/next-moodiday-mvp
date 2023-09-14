"use client";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { useLayoutEffect, useState } from "react";
import { Configure, InstantSearch } from "react-instantsearch-hooks-web";
import { SsrProvider } from "./components/providers/SsrProvider";
import { AgeGateProvider } from "./components/providers/AgeGateProvider";

const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST!,
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [requiredAge, setRequiredAge] = useState(true);

  useLayoutEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <SsrProvider hasMounted={false}>
        <AgeGateProvider>{children}</AgeGateProvider>
      </SsrProvider>
    );
  }

  return (
    <SsrProvider hasMounted={true}>
      <AgeGateProvider>
        <InstantSearch
          searchClient={searchClient}
          indexName="video-detail"
          routing={false}
        >
          <Configure hitsPerPage={18} />
          {children}
        </InstantSearch>
      </AgeGateProvider>
    </SsrProvider>
  );
}
