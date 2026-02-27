export const applyProductFilters = (products, filters) => {
  return products.filter(product => {
    const f = product.fields

    if (filters.subCategory !== "all" && f.section !== filters.section)
      return false

    if (filters.category !== "all" && f.category !== filters.category)
      return false

    if (
      filters.subCategory !== "all" &&
      f.subCategory !== filters.subCategory
    )
      return false

    if (
      filters.colors.length &&
      !filters.colors.some(color => f.colorTags?.includes(color))
    )
      return false

    if (
      filters.sizes.length &&
      !filters.sizes.some(size => f.sizes?.includes(size))
    )
      return false

    return true
  })
}