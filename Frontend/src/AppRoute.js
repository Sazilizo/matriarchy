import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import ProductInfo from "./ProductInfo";
import ProductUpload from "./ProductUpload";

const AppRoutes = ()=>{
    return(
        <>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="products" element={<Products/>}>
            </Route>
            <Route path="products/product/:id" element={<ProductInfo/>}></Route>
            <Route path="products/upload" element={<ProductUpload/>}></Route>
            <Route path="*" element={<p>Page not found</p>}></Route>
        </Routes>
        <Outlet/>
        </>

    )
}

export default AppRoutes;