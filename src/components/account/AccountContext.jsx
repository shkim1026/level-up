"use client";

import { createContext, useContext, useState, useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

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

        // Identify logged-in customer to Klaviyo
        const email = data.customer?.emailAddress?.emailAddress;
        if (email && typeof window !== "undefined") {
          try {
            const _learnq = (window._learnq = window._learnq || []);
            _learnq.push([
              "identify",
              {
                $email: email,
                $first_name: data.customer.firstName || "",
                $last_name: data.customer.lastName || "",
              },
            ]);
          } catch (klaviyoErr) {
            console.warn("Klaviyo account identify error:", klaviyoErr);
          }
        }
      } catch (err) {
        console.log("Error loading customer session:", err);
        const isNetworkError = err?.message === "Failed to fetch" || (typeof navigator !== "undefined" && !navigator.onLine);
        if (!isNetworkError) {
          Sentry.captureException(err);
        }
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