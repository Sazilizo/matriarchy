import React, { createContext, useContext, useState } from "react"

const ProductsContext = createContext(null)

const INITIAL_FILTERS = {
  section: "women",     // women | men | all
  category: "all",      // clothing | sneakers | all
  subCategory: "all",   // dresses | shoes | all
  colors: [],
  sizes: [],
}

export const ProductsProvider = ({ children }) => {
  const [filters, setFilters] = useState(INITIAL_FILTERS)

  const resetFilters = () => setFilters(INITIAL_FILTERS)

  const value = {
    filters,
    setFilters,
    resetFilters,
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsFilters = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error("useProductsFilters must be used within ProductsProvider")
  }
  return context
}