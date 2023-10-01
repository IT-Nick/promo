
// Home.js
import React from "react";
import CubeComponent from "./cube/CubeComponent";
import SmoothScroll from "./scroll/SmoothScroll";
import HeaderBar from "./components/HeaderBar";

export default function HomeComponent() {

    return (
        <>
            <HeaderBar />
            <CubeComponent />

            <SmoothScroll />
        </>

    );
}