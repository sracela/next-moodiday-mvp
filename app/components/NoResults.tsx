"use client";
export interface NoResultsProps {
  searchTerm: string;
}
export default function NoResults({ searchTerm }: NoResultsProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-auto mb-auto">
        <div className="max-w-md">
          <p className="text-md md:text-base lg:text-lg xl:text-xl text-center font-semibold">
            We searched and searched, but unfortunately couldn&apos;t find
            anything for &quot;{searchTerm}&quot;.
          </p>
          <h1 className="text-lg md:text-lg lg:text-xl xl:text-2xl text-center font-black mt-2 font-logo">
            Try a new search!
          </h1>
        </div>
      </div>
    </>
  );
}
