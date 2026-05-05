import React from 'react';
import { Link } from 'react-router';
import "./inlinebanner.css";
import bagsImage from "./assets/bags banner image.jpeg"
import bagsSupportImage from "./assets/brown leather bag modeled.jpeg"
import shoesImage from "./assets/shoes banner image.jpeg"

const Banner =()=>{

    return(
        <section className="banner__container">
            <div className="banner__wrapper">
                <div className="banner banner1">
                    <span className="banner__title">
                        Bags!! Bags!! and more Bags!
                    </span>
                    <Link className="bag__banner-image" to={"/products/bags"}>
                        <img src={bagsImage} alt="bags"/>
                    </Link>
                    <div className="tmbler__support-image">
                        <img  src={bagsSupportImage} alt="modeled bag"/>
                    </div>
                </div>
                <div className="banner banner2">
                    <Link to={"/products/shoes"}>
                        <img src={shoesImage} alt="shoes" />
                    </Link>
                </div>
                <div className="banner banner3">
                    <Link to={"products/accessories"}>
                        <img src={bagsSupportImage} alt="modeled bag"/>
                    </Link>
                </div>
                <div className="banner banner4">
                    <h2></h2>
                    <p>A lot of text about encouraging and motivating women to feel at home with this website</p>
                    <button type="submit">Sign up for newletter</button>
                </div>
            </div>
        </section>
    )
}

export default Banner