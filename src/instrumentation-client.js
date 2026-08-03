// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1,
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Ignore ad-blocker network fetch failures and transient browser aborts/disconnects
  ignoreErrors: [
    "TypeError: Failed to fetch (fast.a.klaviyo.com)",
    /Failed to fetch \(fast\.a\.klaviyo\.com\)/i,
    /NetworkError: A network error occurred/i,
    /NetworkError when attempting to fetch resource/i,
    /TypeError: Load failed/i,
  ],

  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;