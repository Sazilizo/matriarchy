import React, { useState } from 'react';
import { CarouselView } from "./CarouselView";
import { useGallery } from "./hooks/useGallery";
import { motion } from "framer-motion";
import "./productInfo.css";

const ProductGallery = ({ images }) => {
    const gallery = useGallery(images);
    const [overlayOpen, setOverlayOpen] = useState(false);

    return (
      <>
        <CarouselView
          images={images}
          {...gallery}
          onImageClick={() => setOverlayOpen(true)}
        />

        {overlayOpen && (
          <OverlayView
            images={images}
            {...gallery}
            onClose={() => setOverlayOpen(false)}
          />
        )}
      </>
    );
};
export const OverlayView = ({
  images,
  currentIndex,
  next,
  prev,
  goTo,
  onClose
}) => {

  return (
    <div className="product__overlay">

      <button className="overlay__close" onClick={onClose}>
        ✕
      </button>

      <div className="overlay__content">

        <button className="overlay__nav left" onClick={prev}>
          ‹
        </button>

        <div className="overlay__main-image">
          {/* <img src={images[currentIndex]} alt="" /> */}
          <motion.img
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.x < -50) next();
              if (info.offset.x > 50) prev();
            }}
            src={images[currentIndex]}
          />
        </div>

        <button className="overlay__nav right" onClick={next}>
          ›
        </button>

      </div>

      <div className="overlay__thumbnails">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={index === currentIndex ? "active" : ""}
            onClick={() => goTo(index)}
            alt=""
          />
        ))}
      </div>

    </div>
  );
};

const ProductCarouselLoadingSkeleton = () => {
  return (
    <div className="product__carousel product__carousel--loading">
        <div className="product__carousel-images">
            <div className="skeleton skeleton--image"></div>
            <div className="skeleton skeleton--image"></div>
        </div>
    </div>
  )
}
export default ProductGallery;