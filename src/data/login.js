export async function loginCustomer(email, password) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          message
        }
      }
    }
  `;

  return shopifyRequest(query, { input: { email, password } });
}

// STORE THE TOKEN CODE (PASTE IN LOGIN PAGE/COMPONENT)
const result = await loginCustomer(email, password);
const token = result.data.customerAccessTokenCreate.customerAccessToken.accessToken;

localStorage.setItem("shopify_token", token);

// LOGOUT - REMOVE TOKEN (PASTE FOR LOGOUT)
localStorage.removeItem("shopify_token");
