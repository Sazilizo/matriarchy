import React, {useEffect} from "react";
import { useParams,Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "./GetProducts";
import { value } from "jsonpath";
import "./productInfo.css";

const ProductInfo=()=>{
    const {id} = useParams();
    const { data:product } = useQuery({
        queryKey: ["product", id],
        queryFn: ({ queryKey }) => {
            const [, id] = queryKey;
            return getProductById(id);
        },
        staleTime: 100 * 60 * 5
        });


    const imageUrl =product && product.fields.image.fields.file.url &&
    `https:${product.fields.image.fields.file.url}`;

    if (!product) return <p>Loading...</p>
     const {createdAt} = product && product.sys

    const createdDate = new Date(createdAt)
    const now = new Date()

    const isNew =
        createdDate.getMonth() === now.getMonth() &&
        createdDate.getFullYear() === now.getFullYear();

    return(
        <main className="product__info-wrapper">
            <Breadcrumbs/>
            <p>{isNew? "New":"Old"}</p>
            <div className="product__info">
                <div className="product__info-image--wrapper">
                    <div className="product__main-image--wrapper">
                        <div className="product__main-image">
                            <img src={imageUrl} alt={product.fields.description}/>
                            {product.fields.isOnSale && <p className="product__sale-percentage">{product.fields.salePercentage}% off</p>}
                        </div>
                        {product.fields.gallery && <div className="product__gallery">
                            {product.fields.gallery.map((image, index) => (
                                <div key={index} className="product__gallery-image">
                                    <img src={image.fields.file.url} alt={`${product.fields.description} - ${index + 1}`} />
                                </div>
                            ))}
                        </div>} 
                    </div>
                </div>
                <div className="product__info-details">
                    <h1>{product.fields.name}</h1>
                    <p>{product.fields.description}</p>
                    <div className="product__price">
                        {product.fields.isOnSale && <p className="product__was-price">was: R{product.fields.price}</p>}
                        {product.fields.isOnSale && (
                            <p>
                                now: R
                                {product.fields.price * (1 - product.fields.salePercentage / 100)}
                            </p>
                        )}
                    </div>
                    <h3>Color:</h3>
                    {product.fields.colorTags && product.fields.colorTags.map((color, index) => (
                        <span key={index} className="product__color-tag" style={{ backgroundColor: color.toLowerCase() }}>
                            {color}
                        </span>
                    ))}
                    <h3>Size:</h3>
                    {product.fields.variants && Object.keys(product.fields.variants).map((key, index) => (
                            <span key={index} className="product__size-tag">
                                {key}: {product.fields.variants[key]}
                            </span>
                        ))}

                    <div className="product__info-actions">
                        <button className="product__add-to-cart">Add to Cart</button>
                        <button className="product__buy-now">Buy Now</button>
                    </div>
                </div>
            </div>
        </main>
    )
}



function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumbs">
        <li>
          <Link to="/">Home</Link>
        </li>

        {pathnames.map((segment, index) => {
          const to = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to}>
              {isLast ? (
                <span>{formatLabel(segment)}</span>
              ) : (
                <Link to={to}>{formatLabel(segment)}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function formatLabel(segment) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}
export default ProductInfo;