"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  loadCustomerPrivacyApi,
  setTrackingConsent as applyTrackingConsent,
  readCurrentConsent,
} from "@/lib/shopify/customerPrivacy";

const ConsentContext = createContext();
const EMPTY_CONSENT = { marketing: "", analytics: "", preferences: "", sale_of_data: "" };
const DECISION_KEY = "cookieConsentDecisionMade";

export function ConsentProvider({ children }) {
  const [api, setApi] = useState(null);
  const [consent, setConsent] = useState(EMPTY_CONSENT);
  const [isBannerOpen, setIsBannerOpen] = useState(false);

useEffect(() => {
    let cancelled = false;

    loadCustomerPrivacyApi()
      .then((privacyApi) => {
        if (cancelled || !privacyApi) return;
        setApi(privacyApi);
        setConsent(readCurrentConsent(privacyApi));

        // Show the banner to every visitor until they've made an explicit
        // choice, regardless of Shopify's region-based shouldShowBanner().
        const hasDecided = localStorage.getItem(DECISION_KEY) === "true";
        setIsBannerOpen(!hasDecided)
      })
      .catch((err) => console.warn("Customer Privacy API failed to load:", err));

    const handleConsentCollected = () => {
      setApi((current) => {
        if (current) setConsent(readCurrentConsent(current));
        return current;
      });
    };

    document.addEventListener("visitorConsentCollected", handleConsentCollected);
    return () => {
      cancelled = true;
      document.removeEventListener("visitorConsentCollected", handleConsentCollected);
    };
  }, []);

  const saveConsent = useCallback(
    async (partialConsent) => {
      if (!api) return;
      await applyTrackingConsent(api, partialConsent);
      setConsent(readCurrentConsent(api));
      localStorage.setItem(DECISION_KEY, "true");
      setIsBannerOpen(false);
    },
    [api]
  );

  const acceptAll = useCallback(
    () => saveConsent({ marketing: true, analytics: true, preferences: true }),
    [saveConsent]
  );

  const rejectAll = useCallback(
    () => saveConsent({ marketing: false, analytics: false, preferences: false }),
    [saveConsent]
  );

  const openPreferences = useCallback(() => setIsBannerOpen(true), []);

  return (
    <ConsentContext.Provider
      value={{ consent, isBannerOpen, acceptAll, rejectAll, saveConsent, openPreferences }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export const useConsent = () => {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within a ConsentProvider");
  return ctx;
};