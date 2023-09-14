import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

type AgeGateProviderContextProps =
  | {
      requiredAge: undefined | string;
      handleRequiredAgeCookie: () => void;
    }
  | undefined;

const AgeGateProviderContext =
  createContext<AgeGateProviderContextProps>(undefined);

export function AgeGateProvider({ children }: { children: React.ReactNode }) {
  const [requiredAge, setRequiredAge] = useState<undefined | string>(undefined);

  function handleRequiredAgeCookie() {
    Cookies.set("required_age", "yes", { expires: 30 });
    setRequiredAge("yes");
  }

  useEffect(() => {
    const _requiredAge = Cookies.get("required_age");
    if (!_requiredAge) {
      setRequiredAge("no");
    } else {
      setRequiredAge(_requiredAge);
    }
  }, []);

  return (
    <AgeGateProviderContext.Provider
      value={{
        requiredAge,
        handleRequiredAgeCookie,
      }}
    >
      {children}
    </AgeGateProviderContext.Provider>
  );
}

export const useAgeGateProvider = () => {
  const context = useContext(AgeGateProviderContext);

  if (context === undefined) {
    throw new Error(
      "useAgeGateProvider must be used within a AgeGateProviderContext"
    );
  }

  return context;
};
