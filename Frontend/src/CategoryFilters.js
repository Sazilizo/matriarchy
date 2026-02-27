import def from "ajv/dist/vocabularies/discriminator"
import { useProductsFilters } from "./Context/ProductsContext"

const CategoryFilters = () => {
  const { setFilters } = useProductsFilters()

  return (
    <>
      <button onClick={() =>
        setFilters(f => ({ ...f, category: "clothing", subCategory: "all" }))
      }>
        Clothing
      </button>

      <button onClick={() =>
        setFilters(f => ({ ...f, category: "sneakers", subCategory: "all" }))
      }>
        Sneakers
      </button>

      <button onClick={() =>
        setFilters(f => ({ ...f, category: "all", subCategory: "all" }))
      }>
        All
      </button>
    </>
  )
}

export default CategoryFilters;