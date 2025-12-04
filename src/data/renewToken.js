export async function renewToken(token) {
  const query = `
    mutation customerAccessTokenRenew($customerAccessToken: String!) {
      customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors {
          message
        }
      }
    }
  `;

  return shopifyRequest(query, { customerAccessToken: token });
}

// CAN RUN THIS ON PAGE LOAD IF NEEDED