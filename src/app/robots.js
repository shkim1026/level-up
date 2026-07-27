export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://levelupthreads.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/checkout", "/account", "/api/", "/cart"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
