const SHOPIFY_API_URL = "https://level-up-272060.myshopify.com/api/2025-01/graphql.json";
const SHOPIFY_STOREFRONT_TOKEN = "1d84dfaddf78568b1eeea0f9782ff43e";

export async function fetchAllShopifyProducts() {
  const query = `
    {
      products(first: 100) {
        edges {
          node {
            id
            title
            handle
            description
            featuredImage {
              url
              altText
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
            metafields(identifiers: [
              {namespace: "global", key: "popularity"},
              {namespace: "global", key: "rating"},
              {namespace: "global", key: "new"},
              {namespace: "global", key: "series"},
              {namespace: "global", key: "categories"}
            ]) {
              key
              namespace
              type
              value
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(SHOPIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
      cache: "no-store",
    });

    const json = await res.json();

    const products =
      json.data?.products?.edges.map(({ node }) => {
        const metafields = {};

        if (node.metafields) {
          node.metafields.forEach((mf) => {
            if (!mf) return;

            if (mf.type?.includes("number")) {
              metafields[mf.key] = Number(mf.value) || 0;
            } else if (mf.type === "boolean") {
              metafields[mf.key] = mf.value === "true";
            } else {
              metafields[mf.key] = mf.value;
            }
          });
        }

        return {
          id: node.id,
          title: node.title,
          handle: node.handle,
          description: node.description,
          image: node.featuredImage?.url || "",
          price: node.variants.edges[0]?.node.price.amount || "0.00",
          compareAtPrice: node.variants.edges[0]?.node.compareAtPrice?.amount || null,
          currency: node.variants.edges[0]?.node.price.currencyCode || "USD",
          metafields,
        };
      }) || [];

    return products;
  } catch (err) {
    console.error("Error fetching Shopify products:", err);
    return [];
  }
}
