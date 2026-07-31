import * as Sentry from "@sentry/nextjs";

const SHOPIFY_ENDPOINT = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`;

async function fetchShopify(query, variables) {
  const res = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

export async function createCart(cartItems) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: cartItems.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
      })),
    },
  };

  const data = await fetchShopify(query, variables);

  const { cart, userErrors } = data.cartCreate;

  if (userErrors.length) throw new Error(userErrors[0].message);

  // Save cart ID locally for reuse
  localStorage.setItem("shopifyCartId", cart.id);

  return cart;
}

export async function addLinesToCart(cartId, cartItems) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          message
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: cartItems.map(item => ({
      merchandiseId: item.variantId,
      quantity: item.quantity,
    })),
  };

  const data = await fetchShopify(query, variables);

  const { cart, userErrors } = data.cartLinesAdd;

  if (userErrors.length) throw new Error(userErrors[0].message);

  return cart;
}

export async function getOrCreateCart(cartItems) {
  try {
    return await createCart(cartItems);
  } catch (error) {
    Sentry.captureException(error, {
      tags: { cartFallback: "cart-creation-failed" },
    });
    throw error;
  }
}