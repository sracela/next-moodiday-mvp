"use client";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { createContext, useContext, useLayoutEffect, useState } from "react";
import { Configure, InstantSearch } from "react-instantsearch-hooks-web";

const SsrProviderContext = createContext<boolean>(false);

export function SsrProvider({
  children,
  hasMounted,
}: {
  children: React.ReactNode;
  hasMounted: boolean;
}) {
  return (
    <SsrProviderContext.Provider value={hasMounted}>
      {children}
    </SsrProviderContext.Provider>
  );
}

export const useSsrProvider = () => {
  const context = useContext(SsrProviderContext);

  if (context === undefined) {
    throw new Error(
      "useSsrProvider must be used within a SessionSectionContext"
    );
  }

  return context;
};

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
    return <SsrProvider hasMounted={false}>{children}</SsrProvider>;
  }

  return (
    <SsrProvider hasMounted={true}>
      <InstantSearch
        searchClient={searchClient}
        indexName="video-detail"
        routing={false}
      >
        <Configure hitsPerPage={18} />
        {children}
      </InstantSearch>
    </SsrProvider>
  );
}
