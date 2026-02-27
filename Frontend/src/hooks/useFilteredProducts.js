import { useMemo } from "react"
import { useProductsFilters } from "../Context/ProductsContext"

export const useFilteredProducts = (products = []) => {
  const { filters } = useProductsFilters()

  return useMemo(() => {
    return products.filter(product => {
      const fields = product.fields

      // SECTION
      if (
        filters.section !== "all" &&
        fields.section !== filters.section
      ) {
        return false
      }

      // CATEGORY
      if (
        filters.category !== "all" &&
        fields.category !== filters.category
      ) {
        return false
      }

      // SUBCATEGORY
      if (
        filters.subCategory !== "all" &&
        fields.subCategory !== filters.subCategory
      ) {
        return false
      }

      // COLORS
      if (
        filters.colors.length &&
        !filters.colors.some(color =>
          fields.colorTags?.includes(color)
        )
      ) {
        return false
      }

      // SIZES
      if (
        filters.sizes.length &&
        !filters.sizes.some(size =>
          fields.sizes?.includes(size)
        )
      ) {
        return false
      }

      return true
    })
  }, [products, filters])
}