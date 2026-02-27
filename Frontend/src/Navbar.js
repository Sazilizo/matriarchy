import React from "react";
import { Link } from "react-router";
import pinkLogoHead from "./assets/Dusty Pink Matriarchy Logo-head.png"
import pinkLogoFull from "./assets/Dusty Pink Matriarchy Logo.png"
import searchIcon from "./Icons/icons8-search-30.png";
import userIcon from "./Icons/icons8-user-48.png";
import cartIcon from "./Icons/icons8-shopping-bag-32.png"

const NavBar = () => {
    return(
        <div className="navbar">
            <div className="navbar__logo-container">
                <Link to="/">
                    <img src={pinkLogoHead} alt="Dusty Pink Matriarchy Logo" className="navbar__logo-head" />
                    {/* <img src={pinkLogoFull} alt="Dusty Pink Matriarchy Logo" className="navbar__logo-full" /> */}
                </Link>
            </div>
            <div className="navbar__search-container">
                <input type="search" className="search__bar" placeholder="Search for products..."/>
                <div className="search__icon">
                    <img src={searchIcon} alt="Search Icon"/>
                </div>
            </div>
            <div className="user__options">
                <button className="user__option"><img src={userIcon}/></button>
                <button className="user__cart-btn"><img src={cartIcon}/></button>
            </div>
        </div>
    )
}

export default NavBar;