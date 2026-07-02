"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "@/context/ConsentContext";

export default function GoogleAnalyticsGate({ gaId }) {
  const { consent } = useConsent();
  if (!gaId || consent.analytics !== "yes") return null;
  return <GoogleAnalytics gaId={gaId} />;
}