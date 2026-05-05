import React, { useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { getProductById } from "./GetProducts";
import { OverlayView } from "./ProductCarousel";
import { useGallery } from "./hooks/useGallery";

import "./productInfo.css";

const ProductInfo = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const cachedProducts = queryClient.getQueryData(["products"]);
    const cachedProduct = cachedProducts?.find(
        (product) => product.sys.id === id
    );

    const { data: product = cachedProduct } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        enabled: !cachedProduct,
        staleTime: 1000 * 60 * 5,
    });

    const [overlayOpen, setOverlayOpen] = useState(false);


    const imageUrl = `https:${product?.fields.image.fields.file.url}`;
    const images = product?.fields.gallery
    ? product?.fields.gallery.map(img => `https:${img?.fields.file.url}`)
    : [imageUrl];

    const gallery = useGallery(images);
    if (!product) return <p>Loading...</p>;

    const createdDate = new Date(product.sys.createdAt);
    const now = new Date();

    const isNew =
    createdDate.getMonth() === now.getMonth() &&
    createdDate.getFullYear() === now.getFullYear();

    const {
    name,
    description,
    price,
    isOnSale,
    salePercentage,
    colorTags,
    variants,
    tags
    } = product.fields;
    return (
        <main className="product__info">
        <Breadcrumbs />

        <div className="product__info-content--container">
            {/* <div className="product__tags">
                {product.fields.tags?.map((tag, index) => (
                <span key={index} className="product__tag">
                    #{tag}
                </span>
                ))}
            </div> */}

            <div className="product__layout">
                <div className="product__text">
                    <h1>{name}</h1>
                    <p>{description}</p>

                    <div className="product__price">
                        {isOnSale && (
                        <p className="product__was-price">was: R{price}</p>
                        )}

                        <p>
                        {isOnSale
                            ? `now: R${price * (1 - salePercentage / 100)}`
                            : `R${price}`}
                        </p>
                    </div>

                    <div className="product__colors">
                        <h3>Color:</h3>

                        {colorTags?.map((color, index) => (
                        <span
                            key={index}
                            className="product__color-tag"
                            style={{ backgroundColor: color.toLowerCase() }}
                        />
                        ))}
                    </div>

                    <div className="product__sizes">
                        <h3>Size:</h3>

                        {variants &&
                        Object.keys(variants).map((key, index) => (
                            <span key={index} className="product__size-tag">
                            {key}
                            </span>
                        ))}
                    </div>

                    <div className="product__actions">
                        <button className="product__add-to-cart">
                        Add to Cart
                        </button>

                        <button className="product__buy-now">
                        Buy Now
                        </button>
                    </div>

                </div>


                {/* RIGHT SIDE — IMAGE */}

                <div className="product__image">

                    <motion.img
                        src={images[gallery.currentIndex]}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onClick={() => setOverlayOpen(true)}
                        onDragEnd={(e, info) => {
                        if (info.offset.x < -50) gallery.next();
                        if (info.offset.x > 50) gallery.prev();
                        }}
                    />

                </div>

            </div>

        </div>

        {/* ---------- IMAGE OVERLAY ---------- */}

            <div className="product__gallery_-overlay">
                {overlayOpen && (
                    <OverlayView
                    images={images}
                    {...gallery}
                    onClose={() => setOverlayOpen(false)}
                    />
                )}
            </div>
        </main>
    );
};

/* ---------- BREADCRUMBS ---------- */

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
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default ProductInfo;