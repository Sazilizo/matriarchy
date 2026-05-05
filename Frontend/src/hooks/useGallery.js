import { useState } from "react";

export const useGallery = (images, startIndex = 0) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const next = () =>
    setCurrentIndex((i) => (i + 1) % images.length);

  const prev = () =>
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  const goTo = (index) => setCurrentIndex(index);

  return {
    currentIndex,
    next,
    prev,
    goTo,
  };
};