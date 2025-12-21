const domain = process.env["SHOPIFY_STORE_DOMAIN"]!;
const token = process.env["SHOPIFY_STOREFRONT_TOKEN"]!;
const version = process.env["SHOPIFY_API_VERSION"]!;

export async function shopifyFetch(query: string, variables = {}) {
  const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
    next: { revalidate: 60 }, // ISR caching
  });

  if (!res.ok) {
    throw new Error(`Shopify error: ${res.status}`);
  }

  return res.json();
}
