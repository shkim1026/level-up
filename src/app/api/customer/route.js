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
    const shopId = discovery.issuer.split("/").pop();
    const graphqlEndpoint = `https://shopify.com/${shopId}/account/customer/api/2025-10/graphql`;

    const query = `
      query getCustomer {
        customer {
          firstName
          lastName
          emailAddress { emailAddress }
          orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
            edges {
              node {
                id
                name
                processedAt
                financialStatus
                totalPrice { amount currencyCode }
                lineItems(first: 50) {
                  edges {
                    node {
                      title
                      quantity
                      productId
                      image { url altText }
                    }
                  }
                }
              }
            }
          }
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
    console.log("Customer + orders raw response:", JSON.stringify(json, null, 2));

    return NextResponse.json({ customer: json.data?.customer ?? null });
  } catch (err) {
    console.error("Error fetching customer:", err);
    Sentry.captureException(err);
    return NextResponse.json({ customer: null });
  }
}