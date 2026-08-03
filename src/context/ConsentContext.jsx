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
const DATA_KEY = "cookieConsentPreferences";

export function ConsentProvider({ children }) {
  const [api, setApi] = useState(null);
  const [consent, setConsent] = useState(EMPTY_CONSENT);
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const hasDecided = localStorage.getItem(DECISION_KEY) === "true";
    const storedData = localStorage.getItem(DATA_KEY);
    if (storedData) {
      try {
        setConsent(JSON.parse(storedData));
      } catch (e) {
        // ignore invalid JSON
      }
    }
    setIsBannerOpen(!hasDecided);

    loadCustomerPrivacyApi()
      .then((privacyApi) => {
        if (cancelled || !privacyApi) return;
        setApi(privacyApi);
        try {
          const apiConsent = readCurrentConsent(privacyApi);
          if (apiConsent) setConsent(apiConsent);
        } catch (e) {
          console.warn("Could not read current consent from privacy API:", e);
        }
      })
      .catch((err) => console.warn("Customer Privacy API failed to load:", err));

    const handleConsentCollected = () => {
      setApi((current) => {
        if (current) {
          try {
            const currentConsent = readCurrentConsent(current);
            if (currentConsent) setConsent(currentConsent);
          } catch (e) {
            // ignore
          }
        }
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
      const normalizedConsent = {
        marketing: partialConsent.marketing === true || partialConsent.marketing === "yes" ? "yes" : "no",
        analytics: partialConsent.analytics === true || partialConsent.analytics === "yes" ? "yes" : "no",
        preferences: partialConsent.preferences === true || partialConsent.preferences === "yes" ? "yes" : "no",
        sale_of_data: partialConsent.sale_of_data === true || partialConsent.sale_of_data === "yes" ? "yes" : "no",
      };

      if (api) {
        try {
          await applyTrackingConsent(api, partialConsent);
          const apiConsent = readCurrentConsent(api);
          if (apiConsent) {
            Object.assign(normalizedConsent, apiConsent);
          }
        } catch (err) {
          console.warn("Failed to set tracking consent via Customer Privacy API:", err);
        }
      }

      setConsent(normalizedConsent);
      try {
        localStorage.setItem(DECISION_KEY, "true");
        localStorage.setItem(DATA_KEY, JSON.stringify(normalizedConsent));
      } catch (e) {
        console.warn("Could not save consent to localStorage:", e);
      }
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