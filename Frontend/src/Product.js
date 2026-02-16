import React from "react";
import { Link } from "react-router-dom";

const Product=({product})=>{
    const {id} =product.sys
    const {name,description,isOnSale,price,size,section} = product.fields;
    const {url:image} =product.fields.image.fields?.file;

    return(
            <div className="product__card">
                <div className="product__card-image">
                    <Link to={`/products/product/${id}`}>
                        {image && <img src={image} alt={description}/>}
                    </Link>
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
}

export default Product;