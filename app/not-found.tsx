export default function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 mt-auto mb-auto">
        <h1 className="main-heading">404</h1>
        <p className="text-md md:text-base lg:text-lg xl:text-xl text-center">
          Apologies for the inconvenience. The page you are attempting to access
          is currently unavailable.
        </p>
        <p className="text-md md:text-base lg:text-lg xl:text-xl text-center">
          Try searching for something else.
        </p>
      </div>
    </>
  );
}
