"use client";

const SCRIPT_SRC =
  "https://cdn.shopify.com/shopifycloud/consent-tracking-api/v0.2/consent-tracking-api.js";

let scriptPromise = null;

// Loads the Customer Privacy API once, resolves with window.Shopify.customerPrivacy
export function loadCustomerPrivacyApi() {
  if (typeof window === "undefined") return Promise.resolve(null);

  if (window.Shopify?.customerPrivacy) {
    return Promise.resolve(window.Shopify.customerPrivacy);
  }

  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);

    const onLoad = () => {
      if (window.Shopify?.customerPrivacy) {
        resolve(window.Shopify.customerPrivacy);
      } else {
        reject(new Error("Customer Privacy API did not initialize"));
      }
    };
    const onError = () => reject(new Error("Failed to load Customer Privacy API script"));

    if (existing) {
      existing.addEventListener("load", onLoad, { once: true });
      existing.addEventListener("error", onError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });
    document.head.appendChild(script);
  });

  return scriptPromise;
}

// Required on every setTrackingConsent call for custom (non-Hydrogen) storefronts
function getHeadlessParams() {
  return {
    headlessStorefront: true,
    checkoutRootDomain:
      process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN ||
      process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    storefrontRootDomain:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN ||
      (typeof window !== "undefined" ? window.location.hostname : ""),
    storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
  };
}

export function setTrackingConsent(api, consent) {
  return new Promise((resolve, reject) => {
    api.setTrackingConsent({ ...consent, ...getHeadlessParams() }, (result) => {
      if (result?.error) reject(new Error(result.error));
      else resolve(result);
    });
  });
}

// {marketing: 'yes'|'no'|'', analytics: ..., preferences: ..., sale_of_data: ...}
export function readCurrentConsent(api) {
  return api.currentVisitorConsent();
}