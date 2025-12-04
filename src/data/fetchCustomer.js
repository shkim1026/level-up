export async function getCustomer(token) {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        orders(first: 10) {
          edges {
            node {
              id
              orderNumber
              totalPrice {
                amount
              }
            }
          }
        }
      }
    }
  `;

  return shopifyRequest(query, { customerAccessToken: token });
}

// USE IN REACT
const token = localStorage.getItem("shopify_token");
if (token) {
  const customer = await getCustomer(token);
  console.log(customer);
}
