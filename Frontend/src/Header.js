import { useAnimationFrame } from "framer-motion";
import { useRef } from "react";
import './Header.css';
import "./HeroSection.css";
import NavBar from "./Navbar";

const Header =()=>{
  return (
    <div className="header__container">
      <NavBar/>
      <HeaderBanner/>
    </div>
  )
}
const HeaderBanner =()=>{
  return(
    <div className="header__banner-container">
      <div className="header__banner-cta">
        <h2>Show like a <span className="logo__highlight">matriarch</span></h2>
        <p>Discover the latest trends in fashion, shop like the <span className="highlighted">queen</span> you know you are.</p>
        <button className="header__banner-cta-btn">Shop Now</button>
      </div>
      <div className="header__banner-image">
        <img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" alt="header banner"/>
      </div>
    </div>
  )
}
export default Header;

const HeaderSection = () => {
  return(
    <></>
  )
}

// const BUTTONS = [
//   "Dresses", "Skirts", "Jeans", "Tops",
//   "Shoes", "Accessories", "Hats", "Bags",
//   "Sweaters", "Jackets",
// ];

// function MarqueeRow({ speed = 40, reverse = false }) {
//   const trackRef = useRef(null);
//   const offset = useRef(0);
//   const paused = useRef(false);

//   useAnimationFrame((_, delta) => {
//     if (!trackRef.current || paused.current) return;

//     const direction = reverse ? 1 : -1;
//     offset.current += (direction * speed * delta) / 1000;

//     const singleWidth = trackRef.current.scrollWidth / 3;

//     offset.current =
//       ((offset.current % singleWidth) + singleWidth) % singleWidth;

//     trackRef.current.style.transform = `translate3d(${-offset.current}px,0,0)`;
//   });

//   return (
//     <div className="marquee__wrapper">
//       <div ref={trackRef} className="marquee__track">
//         {[...BUTTONS, ...BUTTONS, ...BUTTONS].map((label, i) => (
//           <button
//             key={i}
//             className="neon__btn"
//             onMouseEnter={() => (paused.current = true)}
//             onMouseLeave={() => (paused.current = false)}
//             onClick={() => {
//               // hook this into filters / routing later
//               console.log("Clicked:", label);
//             }}
//           >
//             {label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function HeroSection() {
//   return (
//     <section className="hero">
//       <div className="hero__cta">
//         <h1>Shop Your Style</h1>
//         <p>Discover the latest trends in fashion</p>
//       </div>

//       <div className="marquee__stack">
//         <MarqueeRow speed={36} />
//         <MarqueeRow speed={44} reverse />
//         <MarqueeRow speed={32} />
//       </div>
//     </section>
//   );
// }