import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./GetProducts";
import Product from "./Product";
import CategoryFilters from "./CategoryFilters";
import { useProductsFilters } from "./Context/ProductsContext";
import { applyProductFilters } from "./utils/filters";
import { useWindowMetrics } from "./hooks/useWindowMetrics";
import { useWindowWidth } from "./hooks/useWindowWidth";

const Products = () => {
  const { filters } = useProductsFilters();
  const { height, scrollY } = useWindowMetrics();
  const width = useWindowWidth();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    console.log("width", width);
  }, [width]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  const filteredProducts = applyProductFilters(products, filters);

  return (
    <section className="products">
      <div className="products__wrapper">
        <aside className="products__filters">
          <CategoryFilters />
        </aside>

        <div className="product__cards">
          {filteredProducts.length === 0 && <p>No products found</p>}

          {filteredProducts.map((product) => (
            <Product key={product.sys.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;