
// Home.js
import React from "react";
import CubeComponent from "./cube/CubeComponent";
import HeaderBar from "./components/HeaderBar";
import Hero from "./components/Hero";
import BeforeAfter from "./components/BeforeAfter";

export default function HomeComponent() {

    return (
        <>
            <HeaderBar />
            <CubeComponent />
            <Hero />
            <Hero />
            <BeforeAfter />
            <Hero />
        </>

    );
}