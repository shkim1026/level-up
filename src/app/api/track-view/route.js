const SHOPIFY_ADMIN_API_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/api/2025-01/graphql.json`;
const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;

async function fetchAdmin(query, variables) {
  const res = await fetch(SHOPIFY_ADMIN_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": SHOPIFY_ADMIN_API_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

export async function POST(request) {
  try {
    const { productId } = await request.json();
    if (!productId) {
      return Response.json({ error: "Missing productId" }, { status: 400 });
    }

    // Read the current value first — metafieldsSet has no atomic increment
    const getQuery = `
      query getPopularity($id: ID!) {
        product(id: $id) {
          metafield(namespace: "global", key: "popularity") {
            value
            type
          }
        }
      }
    `;
    const getData = await fetchAdmin(getQuery, { id: productId });
    const existing = getData.product?.metafield;
    const currentValue = existing ? parseInt(existing.value, 10) || 0 : 0;
    const metafieldType = existing?.type || "number_integer";

    const setQuery = `
      mutation setPopularity($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields { id value }
          userErrors { field message }
        }
      }
    `;
    const setData = await fetchAdmin(setQuery, {
      metafields: [
        {
          ownerId: productId,
          namespace: "global",
          key: "popularity",
          type: metafieldType,
          value: String(currentValue + 1),
        },
      ],
    });

    if (setData.metafieldsSet.userErrors.length) {
      return Response.json(
        { error: setData.metafieldsSet.userErrors[0].message },
        { status: 400 }
      );
    }

    return Response.json({ success: true, newValue: currentValue + 1 });
  } catch (err) {
    console.error("Error updating popularity metafield:", err);
    return Response.json({ error: "Failed to update popularity" }, { status: 500 });
  }
}