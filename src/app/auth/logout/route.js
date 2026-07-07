import { NextResponse } from "next/server";

export async function GET(request) {
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const idToken = request.cookies.get("shopify_id_token")?.value;

  const discoveryRes = await fetch(`https://${storeDomain}/.well-known/openid-configuration`);
  const discovery = await discoveryRes.json();

  let redirectTarget = `${baseUrl}/`;
  if (discovery.end_session_endpoint && idToken) {
    const logoutUrl = new URL(discovery.end_session_endpoint);
    logoutUrl.searchParams.set("id_token_hint", idToken);
    logoutUrl.searchParams.set("post_logout_redirect_uri", `${baseUrl}/`);
    redirectTarget = logoutUrl.toString();
  }

  const response = NextResponse.redirect(redirectTarget);
  response.cookies.delete("shopify_access_token");
  response.cookies.delete("shopify_refresh_token");
  response.cookies.delete("shopify_id_token");

  return response;
}