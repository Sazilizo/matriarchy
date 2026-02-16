import React,{useEffect,useState} from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./GetProducts";
import Product from "./Product";
import { Outlet } from "react-router-dom";

const Products=()=>{
   const {data, isError, isLoading,error} = useQuery({
           queryKey: ["product"],
           queryFn: getProducts,
           staleTime: 1000*60*5,
    })
   
       useEffect(() => {
           console.log(data);
       }, [data]);
   
       if(!isLoading && !isError && !data) return <p>No available data</p>
       if (isLoading) return <p>Loading...</p>
       if (isError) return <p>{error.message}</p>
   
       return (
           <>
           
           <div className="product__cards">
               {data && data.map(product=>{
                   return <Product key={product.sys.id} product={product}/>
               })}
           </div>
           </>
       )
}

export default Products;
