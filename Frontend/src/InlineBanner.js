import React, { useState, useEffect } from 'react';
import { Link ,Outlet} from 'react-router';
import "./banner.css";
const InlineBanner =({classNames, flexDirection, products})=>{
    
    const mainClass = classNames && classNames.filter((c) => c.includes("inline__banner-container") || c.includes("inline__banner-wrapper"));
    const productsBanner = classNames && classNames.filter((c) => c.includes("inline__banner-products"));
    const productsLinks = classNames && classNames.filter((c) => c.includes("inline__banner-product-link"));

     return(
        <div style={{flexDirection: flexDirection}}className={mainClass ? mainClass.join(" ") : "inline__banner-container inline__banner-wrapper " + flexDirection}>
            {products &&<div className={productsBanner ? productsBanner.join(" ") : "inline__banner-products"}>
                {products.map((product) => {
                    const {id} =product.sys
                    const {description,isOnSale,price,salePercentage,} = product.fields;
                    const {url:image} =product.fields.image.fields.file;
                    return(
                        <div key={id} className="inline__banner-product">
                            <Link to={`products/product/${id}`}>
                                <div className="inline__banner-product-image">
                                    <img src={image} alt={description}/>
                                    {product.fields.isOnSale && (
                                        <p>
                                            now: R
                                            {price * (1 - salePercentage / 100)}
                                        </p>
                                    )}
                                    <div className="inline__banner-product-info">
                                            {isOnSale && <p className="product__was-price">was: R{price}</p>}
                                            {isOnSale && <p>now: R{price - (price * 0.2)}</p>}
                                            {!isOnSale && <p>R{price}</p>}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>}
            <div className={productsLinks ? productsLinks.join(" ") : "inline__banner-product-link"}>
                <Link to="/products" className="inline__banner-link">
                    {products &&<button className="inline__banner-product-link-btn">{products[0].fields?.subCategory}</button>}
                </Link>
            </div>
            <Outlet/>
        </div>
     )
}

export default InlineBanner;