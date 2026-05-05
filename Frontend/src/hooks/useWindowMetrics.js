import { useState, useEffect } from "react";

export const useWindowMetrics = () => {
  const [metrics, setMetrics] = useState({
    height: window.innerHeight,
    scrollY: window.scrollY,
    documentHeight: document.documentElement.scrollHeight,
  });

  useEffect(() => {

    const handleResize = () => {
      setMetrics(prev => ({
        ...prev,
        height: window.innerHeight,
        documentHeight: document.documentElement.scrollHeight
      }));
    };

    const handleScroll = () => {
      setMetrics(prev => ({
        ...prev,
        scrollY: window.scrollY
      }));
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  return metrics;
};