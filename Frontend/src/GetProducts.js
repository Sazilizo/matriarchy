import { createClient } from "contentful";

const spaceId = process.env.REACT_APP_CONTENTFUL_SPACE_ID;
const accessToken = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;


const client = createClient({
    space: spaceId,
    accessToken: accessToken
});

// cache.js
export const readCache = (key) => {
  try {
    const cached = localStorage.getItem(key)
    return cached ? JSON.parse(cached) : null
  } catch {
    return null
  }
}

export const writeCache = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const clearCache = (key) => {
  localStorage.removeItem(key)
}

export const getProducts = async () => {
  const cacheKey = "products"

  // 1️⃣ Read from localStorage first
  const cached = readCache(cacheKey)
  if (cached) return cached

  // 2️⃣ Fetch from Contentful
  const response = await client.getEntries({
    content_type: "product",
    "fields.section[in]": ["women", "unisex"],
  })

  const products = response.items

  // 3️⃣ Persist cache
  writeCache(cacheKey, products)

  // 4️⃣ Return to React Query
  return products
}

export const getProductById = async (id) => {
  if (!id) throw new Error("Product ID is required")

  const cacheKey = `product-${id}`

  const cached = readCache(cacheKey)
  if (cached) return cached

  const product = await client.getEntry(id)

  writeCache(cacheKey, product)
  return product
}