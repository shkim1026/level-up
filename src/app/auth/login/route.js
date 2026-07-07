import { NextResponse } from "next/server";
import { generateCodeVerifier, generateCodeChallenge, generateRandomString } from "@/lib/shopify/pkce";

export async function GET() {
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_API_CLIENT_ID;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const discoveryRes = await fetch(`https://${storeDomain}/.well-known/openid-configuration`);
  const discovery = await discoveryRes.json();
  console.log("OpenID discovery:", discovery); // confirm field names before relying on them

  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = generateRandomString();
  const nonce = generateRandomString();

  const authUrl = new URL(discovery.authorization_endpoint);
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("redirect_uri", `${baseUrl}/auth/callback`);
  authUrl.searchParams.set("scope", "openid email customer-account-api:full");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("nonce", nonce);
  authUrl.searchParams.set("code_challenge", codeChallenge);
  authUrl.searchParams.set("code_challenge_method", "S256");

  const response = NextResponse.redirect(authUrl.toString());
  const cookieOpts = { httpOnly: true, secure: true, sameSite: "lax", maxAge: 600, path: "/" };
  response.cookies.set("shopify_code_verifier", codeVerifier, cookieOpts);
  response.cookies.set("shopify_auth_state", state, cookieOpts);

  return response;
}