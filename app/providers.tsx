"use client";

import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { createContext, useContext, useEffect, useState } from "react";
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

export function Providers({ children }: { children: React.ReactNode }) {
  const searchClient = instantMeiliSearch(
    process.env.NEXT_PUBLIC_MEILISEARCH_HOST!,
    process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY
  );

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
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
