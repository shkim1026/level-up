import { shopifyRequest } from "./shopifyClient";

export async function createCustomer(email, password) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
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