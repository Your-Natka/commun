import React, { createContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  setToken: (t: string | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem("token"));

  const setToken = (t: string | null) => {
    if (t) {
      localStorage.setItem("token", t);
      setTokenState(t);
    } else {
      localStorage.removeItem("token");
      setTokenState(null);
    }
  };

  useEffect(() => {
    // optional: validate token on load
  }, []);

  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};
