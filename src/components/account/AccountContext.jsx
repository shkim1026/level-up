"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCustomer() {
      try {
        const res = await fetch("/api/customer");
        const data = await res.json();
        setCustomer(data.customer);
      } catch (err) {
        console.log("Error loading customer session:", err);
        Sentry.captureException(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCustomer();
  }, []);

  const login = () => {
    window.location.href = "/auth/login";
  };

  const logout = () => {
    window.location.href = "/auth/logout";
  };

  return (
    <AccountContext.Provider value={{ customer, isLoading, login, logout }}>
      {children}
    </AccountContext.Provider>
  );
}

export const useAccount = () => useContext(AccountContext);