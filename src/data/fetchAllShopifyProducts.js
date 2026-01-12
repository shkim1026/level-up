const SHOPIFY_API_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

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
            tags
            featuredImage {
              url
              altText
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
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
          images: node.images
            ? node.images.edges.map(edge => ({
              url: edge.node.url || null,
              altText: edge.node.altText || "",
            }))
            : [],
          variants: node.variants?.edges.map(edge => ({
            id: edge.node.id,
            title: edge.node.title,
            price: edge.node.price?.amount || "0.00",
            compareAtPrice: edge.node.compareAtPrice?.amount || null,
            currency: edge.node.price?.currencyCode || "USD",
            options: edge.node.selectedOptions.map(opt => ({
              name: opt.name,
              value: opt.value,
            })),
          })) || [],
          price: node.variants.edges[0]?.node.price.amount || "0.00",
          compareAtPrice: node.variants.edges[0]?.node.compareAtPrice?.amount || null,
          currency: node.variants.edges[0]?.node.price.currencyCode || "USD",
          metafields,
          tags: node.tags || [],
        };
      }) || [];

    return products;
  } catch (err) {
    console.error("Error fetching Shopify products:", err);
    return [];
  }
}
