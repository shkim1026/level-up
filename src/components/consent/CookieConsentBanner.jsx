"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConsent } from "@/context/ConsentContext";

const TOGGLES = [
  { key: "analytics", label: "Analytics", description: "Helps us understand how you use the site." },
  { key: "marketing", label: "Marketing", description: "Personalized ads and marketing communications." },
  { key: "preferences", label: "Preferences", description: "Remembers choices like country or language." },
];

export default function CookieConsentBanner() {
  const { isBannerOpen, consent, acceptAll, rejectAll, saveConsent } = useConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [draft, setDraft] = useState({ analytics: false, marketing: false, preferences: false });

  useEffect(() => {
    if (isBannerOpen) {
      setDraft({
        analytics: consent.analytics === "yes",
        marketing: consent.marketing === "yes",
        preferences: consent.preferences === "yes",
      });
    } else {
      setShowDetails(false);
    }
  }, [isBannerOpen, consent]);

  const toggle = (key) => setDraft((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <AnimatePresence>
      {isBannerOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-300 shadow-xl"
        >
          <div className="max-w-container mx-auto px-4 py-5 sm:px-8 sm:py-6">
            {!showDetails ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-dark-gray max-w-2xl">
                  We use cookies to run this site, understand how it's used, and personalize
                  marketing. Accept all, reject non-essential cookies, or customize your choices.
                </p>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <button
                    onClick={() => setShowDetails(true)}
                    className="px-4 py-2 border border-gray-400 text-dark-gray rounded-lg uppercase text-xs tracking-wide cursor-pointer hover:bg-gray-100"
                  >
                    Customize
                  </button>
                  <button
                    onClick={rejectAll}
                    className="px-4 py-2 border border-gray-400 text-dark-gray rounded-lg uppercase text-xs tracking-wide cursor-pointer hover:bg-gray-100"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 bg-dark-gray text-white rounded-lg uppercase text-xs tracking-wide cursor-pointer hover:bg-hover-gray"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase text-dark-gray">
                    Cookie Preferences
                  </h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-xs underline text-gray-500 cursor-pointer"
                  >
                    Back
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-start justify-between border border-gray-200 rounded-lg p-3 opacity-60">
                    <div>
                      <p className="text-sm font-medium text-dark-gray">Essential</p>
                      <p className="text-xs text-gray-500">Required for cart and checkout to work.</p>
                    </div>
                    <span className="text-xs uppercase text-gray-400 shrink-0 ml-2">Always on</span>
                  </div>

                  {TOGGLES.map(({ key, label, description }) => (
                    <label
                      key={key}
                      className="flex items-start justify-between border border-gray-200 rounded-lg p-3 cursor-pointer"
                    >
                      <div>
                        <p className="text-sm font-medium text-dark-gray">{label}</p>
                        <p className="text-xs text-gray-500">{description}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={draft[key]}
                        onChange={() => toggle(key)}
                        className="mt-1 cursor-pointer shrink-0 ml-2"
                      />
                    </label>
                  ))}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={rejectAll}
                    className="px-4 py-2 border border-gray-400 text-dark-gray rounded-lg uppercase text-xs tracking-wide cursor-pointer hover:bg-gray-100"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={() => saveConsent(draft)}
                    className="px-4 py-2 bg-dark-gray text-white rounded-lg uppercase text-xs tracking-wide cursor-pointer hover:bg-hover-gray"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}