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
  const existingCartId = localStorage.getItem("shopifyCartId");

  if (!existingCartId) {
    return await createCart(cartItems);
  }

  try {
    const cartQuery = `
      query getCart($id: ID!) {
        cart(id: $id) {
          id
          lines(first: 100) {
            edges {
              node {
                merchandise {id}
                quantity
              }
            }
          }
          checkoutUrl
        }
      }
    `;

    const data = await fetchShopify(cartQuery, { id: existingCartId });
    const existingCart = data.cart;

    if (!existingCart.lines.edges.length) {
      return await addLinesToCart(existingCart, cartItems);
    } else {
      return existingCart;
    }
  } catch (error) {
    // If existing cart fails, create a new one
    localStorage.removeItem("shopifyCartId");
    return await createCart(cartItems);
  }
}

