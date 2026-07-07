import { NextResponse } from "next/server";

export async function GET(request) {
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const accessToken = request.cookies.get("shopify_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ customer: null });
  }

  try {
    const discoveryRes = await fetch(`https://${storeDomain}/.well-known/openid-configuration`);
    const discovery = await discoveryRes.json();
    const graphqlEndpoint = discovery.graphql_api; // confirm this field name via the console.log below

    const query = `
      query getCustomer {
        customer {
          firstName
          lastName
          emailAddress { emailAddress }
        }
      }
    `;

    const res = await fetch(graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken, // raw token, no "Bearer" prefix
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();
    console.log("Customer Account API response:", json);

    return NextResponse.json({ customer: json.data?.customer ?? null });
  } catch (err) {
    console.error("Error fetching customer:", err);
    return NextResponse.json({ customer: null });
  }
}