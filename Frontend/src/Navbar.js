import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import pinkLogoHead from "./assets/Dusty Pink Matriarchy Logo-head.png";
import pinkLogoFull from "./assets/Dusty Pink Matriarchy Logo.png";
import searchIcon from "./Icons/icons8-search-30.png";
import userIcon from "./Icons/icons8-user-48.png";
import cartIcon from "./Icons/icons8-shopping-bag-32.png";
import "./Navbar.css";

const NavigationList = [
  {
    label: "Dresses",
    path: "dresses",
    options: ["Short", "Long", "Relaxed"],
    id: 1,
  },
  {
    label: "Tops",
    path: "tops",
    options: ["Long Sleeve", "Short Sleeve", "Crop Tops", "Golfers", "Shirts"],
    id: 2,
  },
  {
    label: "Jeans",
    path: "jeans",
    options: ["Skinny", "Ripped", "Baggy", "Shorts", "Culottes", "Flared"],
    id: 3,
  },
  {
    label: "Accessories",
    path: "accessories",
    options: ["Watches", "Bracelets", "Earrings", "Anklets", "Hand Bands"],
    id: 4,
  },
  {
    label: "Bags",
    path: "bags",
    options: ["Luggage Bags", "Shoulder Bags", "Purse"],
    id: 5,
  },
];

const NavBar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [pointerX, setPointerX] = useState(0);

  const navRef = useRef(null);

  const handleMenu = (e, nav) => {
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();

    const navCenter = navRect.left + navRect.width / 2;

    const pointerPosition = buttonRect.left + buttonRect.width / 2 - navCenter;

    setPointerX(pointerPosition);
    setActiveMenu(nav);
    };

  const closeMenu = () => setActiveMenu(null);

  return (
    <div className="navbar__container">
      {/* LOGO */}
      <div className="navbar__logo-container">
        <Link to="/">
          <img src={pinkLogoHead} alt="logo" />
        </Link>
      </div>

      {/* NAVIGATION */}
      <div className="navigation__menu-search-container">
        <div className="search__bar-container">
          <input
            type="search"
            className="search__bar"
            placeholder="Search for products..."
          />
          <img className="search__icon" src={searchIcon} alt="search" />
        </div>

        <nav
          className="navigation__menu"
          ref={navRef}
          onMouseLeave={closeMenu}
        >
          {NavigationList.map((nav) => (
            <button
              key={nav.id}
              className="nav__item"
              onMouseEnter={(e) => handleMenu(e, nav)}
            >
              {nav.label}
            </button>
          ))}

          <MenuOverlay activeMenu={activeMenu} pointerX={pointerX} />
        </nav>
      </div>

      {/* USER */}
      <div className="user__options">
        <button>
          <img src={userIcon} alt="user" />
        </button>

        <button>
          <img src={cartIcon} alt="cart" />
        </button>
      </div>
    </div>
  );
};

const MenuOverlay = ({ activeMenu, pointerX }) => {

  return (
    <div
      className={`submenu__items-overlay ${
        activeMenu ? "submenu__open" : ""
      }`}
      style={{ "--pointer-x": `${pointerX }px` }}
    >
      {activeMenu && (
        <>
          <ul className="submenu__items">
            {activeMenu.options.map((option, i) => (
              <li key={i}>
                <Link to={`/products/${activeMenu.path}/${option}`}>
                  {option}
                </Link>
              </li>
            ))}
          </ul>

          <div className="submenu__item-accompanying--image">
            <img src={pinkLogoFull} alt="preview" />
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;