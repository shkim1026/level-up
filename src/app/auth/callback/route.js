import { NextResponse } from "next/server";

export async function GET(request) {
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_API_CLIENT_ID;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const returnedState = searchParams.get("state");

  const storedState = request.cookies.get("shopify_auth_state")?.value;
  const codeVerifier = request.cookies.get("shopify_code_verifier")?.value;

  if (!code || !returnedState || returnedState !== storedState || !codeVerifier) {
    return NextResponse.redirect(`${baseUrl}/?auth_error=1`);
  }

  const discoveryRes = await fetch(`https://${storeDomain}/.well-known/openid-configuration`);
  const discovery = await discoveryRes.json();

  const tokenRes = await fetch(discovery.token_endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      redirect_uri: `${baseUrl}/auth/callback`,
      code,
      code_verifier: codeVerifier,
    }),
  });

  const tokenData = await tokenRes.json();
  console.log("Token response:", tokenData); // confirm field names (access_token, refresh_token, id_token, expires_in)

  if (!tokenData.access_token) {
    return NextResponse.redirect(`${baseUrl}/?auth_error=1`);
  }

  const response = NextResponse.redirect(`${baseUrl}/`);
  const cookieOpts = { httpOnly: true, secure: true, sameSite: "lax", path: "/" };

  response.cookies.set("shopify_access_token", tokenData.access_token, {
    ...cookieOpts,
    maxAge: tokenData.expires_in,
  });
  if (tokenData.refresh_token) {
    response.cookies.set("shopify_refresh_token", tokenData.refresh_token, {
      ...cookieOpts,
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  if (tokenData.id_token) {
    response.cookies.set("shopify_id_token", tokenData.id_token, cookieOpts);
  }

  response.cookies.delete("shopify_code_verifier");
  response.cookies.delete("shopify_auth_state");

  return response;
}