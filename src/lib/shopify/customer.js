const SHOPIFY_ENDPOINT = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

async function fetchShopify(query, variables) {
  const res = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

export async function loginCustomer(email, password) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          message
        }
      }
    }
  `;

  const data = await fetchShopify(query, {
    input: { email, password },
  });

  const { customerAccessToken, customerUserErrors } = data.customerAccessTokenCreate;

  if (customerUserErrors.length) {
    throw new Error(customerUserErrors[0].message);
  }

  return customerAccessToken; // { accessToken, expiresAt }
}

export async function createCustomer(email, password, firstName, lastName) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
        }
        customerUserErrors {
          message
        }
      }
    }
  `;

  const data = await fetchShopify(query, {
    input: { email, password, firstName, lastName },
  });

  const { customer, customerUserErrors } = data.customerCreate;

  if (customerUserErrors.length) {
    throw new Error(customerUserErrors[0].message);
  }

  return customer;
}

export async function getCustomer(accessToken) {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
      }
    }
  `;

  const data = await fetchShopify(query, { customerAccessToken: accessToken });
  return data.customer;
}

export async function logoutCustomer(accessToken) {
  const query = `
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        userErrors {
          message
        }
      }
    }
  `;

  await fetchShopify(query, { customerAccessToken: accessToken });
}