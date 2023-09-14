import { createContext, useContext } from "react";

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
