import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "./GetProducts";

const ProductInfo=()=>{
    const {id} = useParams();
    const { data } = useQuery({
        queryKey: ["product", id],
        queryFn: ({ queryKey }) => {
            const [, id] = queryKey;
            return getProductById(id);
        },
        staleTime: 100 * 60 * 5
        });

    useEffect(() =>{
        console.log(data);
    },[data])

    return(
        <>
            <p>Product Info for ID: {id}</p>
        </>
    )
}

export default ProductInfo;