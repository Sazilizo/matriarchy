import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getProducts } from "./GetProducts"
import Product from "./Product"
import CategoryFilters from "./CategoryFilters"
import { useProductsFilters } from "./Context/ProductsContext"
import { applyProductFilters } from "./utils/filters"

const Products = () => {
  const { filters } = useProductsFilters()

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>{error.message}</p>

  // 🔑 Apply filters AFTER fetch
  const filteredProducts = applyProductFilters(products, filters)

  return (
    <>
      <CategoryFilters />

      <div className="product__cards">
        {filteredProducts.length === 0 && <p>No products found</p>}

        {filteredProducts.map(product => (
          <Product key={product.sys.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default Products