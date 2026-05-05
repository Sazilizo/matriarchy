import React, {useEffect, useState} from "react";
import { getProducts } from "./GetProducts";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Product from "./Product";
import "./products.css"
import Banner from "./InlineBanner";


const Home=()=>{
    const {data, isError, isLoading,error} = useQuery({
        queryKey: ["product"],
        queryFn: getProducts,
        staleTime: 1000*60*5,
    });

    const tops = data?.filter(product => product.fields.subCategory && (product.fields.subCategory.includes("Dresses") || product.fields.subCategory.includes("dresses")));
    // const

    useEffect(() => {
        console.log(data);
    }, [data]);
    if(!isLoading && !isError && !data) return <p>No available data</p>
    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>{error.message}</p>

    return (
        <>
        <div className="banner__wrapper">
            <Banner />
        </div>
        <div className="product__cards">
            {data && data.map(product=>{
                const {id, createdAt} =product.sys
                const {name,description,isOnSale,price,size,section} = product.fields;
                const {url:image} =product.fields.image.fields.file;
                console.log(createdAt);
                return(
                   <Product key={id} product={product}/>
                )
            })}
        </div>
        </>
    )
}
export default Home;