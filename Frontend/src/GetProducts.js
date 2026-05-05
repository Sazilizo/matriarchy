import { createClient } from "contentful";

const spaceId = process.env.REACT_APP_CONTENTFUL_SPACE_ID;
const accessToken = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: spaceId,
  accessToken: accessToken,
});

// Fetch all products
export const getProducts = async () => {
  const response = await client.getEntries({
    content_type: "product",
    "fields.section[in]": ["women", "unisex"],
  });

  return response.items;
};

// Fetch a single product
export const getProductById = async (id) => {
  if (!id) throw new Error("Product ID is required");

  const product = await client.getEntry(id);
  return product;
};