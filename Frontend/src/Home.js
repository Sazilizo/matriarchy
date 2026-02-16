import React, {useEffect, useState} from "react";
import { getProducts } from "./GetProducts";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import "./products.css"
const Home=()=>{
    const {data, isError, isLoading,error} = useQuery({
        queryKey: ["product"],
        queryFn: getProducts,
        staleTime: 1000*60*5,
    });

    const testBackendSendData = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "From frontend",
                price: 250,
            }),
            });

            const data = await res.json();
            console.log("Backend response:", data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
        };

    useEffect(() => {
        testBackendSendData();
    }, []);
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
                const {id} =product.sys
                const {name,description,isOnSale,price,size,section} = product.fields;
                const {url:image} =product.fields.image.fields.file;
                return(
                    <div key={id} className="product__card">
                        <div className="product__card-image">
                            <img src={image} alt={description}/>
                        </div>
                        <div className="product__card-info">
                            <h1>{name}</h1>
                            <div className="product__card-price">
                                <p>R{price}</p>
                                {isOnSale && <p>On Sale</p>}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}
export default Home;