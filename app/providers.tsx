"use client";

import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { InstantSearch } from "react-instantsearch-hooks-web";

export function Providers({ children }: { children: React.ReactNode }) {
  const searchClient = instantMeiliSearch(
    process.env.NEXT_PUBLIC_MEILISEARCH_HOST!,
    process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY
  );
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="video-detail"
      routing={false}
    >
      {children}
    </InstantSearch>
  );
}
