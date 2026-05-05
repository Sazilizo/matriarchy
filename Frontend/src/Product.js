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

    const salePrice = isOnSale && product.fields.salePercentage && Math.round(price * (1 - product.fields?.salePercentage / 100))
    return (
    <div className="product__card">
      <div className="product__card-image">
        <Link className="product__card-image--link" to={`/products/product/${id}`}>
          {imageUrl && (
            <img
            
              src={imageUrl}
              alt={description}
              loading="lazy"
            />
          )}
        </Link>
          {isNew && <p className="product__new-label">New</p>}
          {isOnSale && <p className="product__sale-label">Sale</p>}
      </div>

      <div className="product__card-info">
        <h3 className="secondary__heading">{name.length > 20 ? `${name.substring(0, 25)}...` : name }</h3>
        <div className="product__card-price">
          {isOnSale && product.fields.salePercentage ? (
            <div className="product__card-price--container">
              <span style={{ textDecoration: 'line-through' }} className="tertiary__heading product__card-price--original">R{price}</span>
              <span className="tertiary__heading product__card-price--sale">
                R{salePrice}
              </span>
              <span className="product__sale-percentage">{product.fields.salePercentage}%</span>
            </div>
          ) : (
            <span className="tertiary__heading">R{price}</span>
          )}

        </div>
      </div>
    </div>
  )
}

export default Product