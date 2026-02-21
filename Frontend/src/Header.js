import { useAnimationFrame } from "framer-motion";
import { useRef } from "react";
import "./HeroSection.css";

const BUTTONS = [
  "Dresses", "Skirts", "Jeans", "Tops",
  "Shoes", "Accessories", "Hats", "Bags",
  "Sweaters", "Jackets",
];

function MarqueeRow({ speed = 40, reverse = false }) {
  const trackRef = useRef(null);
  const offset = useRef(0);
  const paused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (!trackRef.current || paused.current) return;

    const direction = reverse ? 1 : -1;
    offset.current += (direction * speed * delta) / 1000;

    const singleWidth = trackRef.current.scrollWidth / 3;

    offset.current =
      ((offset.current % singleWidth) + singleWidth) % singleWidth;

    trackRef.current.style.transform = `translate3d(${-offset.current}px,0,0)`;
  });

  return (
    <div className="marquee__wrapper">
      <div ref={trackRef} className="marquee__track">
        {[...BUTTONS, ...BUTTONS, ...BUTTONS].map((label, i) => (
          <button
            key={i}
            className="neon__btn"
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
            onClick={() => {
              // hook this into filters / routing later
              console.log("Clicked:", label);
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__cta">
        <h1>Shop Your Style</h1>
        <p>Discover the latest trends in fashion</p>
      </div>

      <div className="marquee__stack">
        <MarqueeRow speed={36} />
        <MarqueeRow speed={44} reverse />
        <MarqueeRow speed={32} />
      </div>
    </section>
  );
}