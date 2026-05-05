import React from "react";

export const CarouselView = ({
  images,
  currentIndex,
  next,
  prev,
  onImageClick
}) => {

  return (
    <div className="product__carousel">

      <button onClick={prev}>‹</button>

      <div className="product__carousel-images">

        <img
          src={images[currentIndex]}
          onClick={() => onImageClick(currentIndex)}
          alt=""
        />

        <img
          src={images[(currentIndex + 1) % images.length]}
          onClick={() => onImageClick((currentIndex + 1) % images.length)}
          alt=""
        />

      </div>

      <button onClick={next}>›</button>

    </div>
  );
};