"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { API } from "./api/gist";

export const AuthContext = createContext(false);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await API.authCheck();
        setAuth(true);
      } catch {
        setAuth(false);
      }
    })()
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
