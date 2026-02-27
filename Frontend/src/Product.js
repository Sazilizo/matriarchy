import React from'react';
import { Link } from "react-router";
import "./products.css";

const Product = ({ product }) => {
  const { id,createdAt } = product.sys
  const { name, description, isOnSale, price } = product.fields

  const imageUrl =
    product.fields.image?.fields?.file?.url &&
    `https:${product.fields.image.fields.file.url}`

    if (!product) return <p>Loading...</p>
    const createdDate = new Date(createdAt)
    const now = new Date()

    const isNew =
        createdDate.getMonth() === now.getMonth() &&
        createdDate.getFullYear() === now.getFullYear();

  return (
    <div className="product__card">
      <div className="product__card-image">
        <Link to={`/products/product/${id}`}>
          {imageUrl && (
            <img
            
              src={imageUrl}
              alt={description}
              loading="lazy"
            />
          )}
          {isNew && <p className="product__new-label">New</p>}
        </Link>
      </div>

      <div className="product__card-info">
        <h3>{name}</h3>
        <div className="product__card-price">
          <p>R{price}</p>
          {isOnSale && <p>On Sale</p>}
        </div>
      </div>
    </div>
  )
}

export default Product