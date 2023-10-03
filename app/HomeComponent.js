"use client";
import { React, useState} from "react";
import HeaderBar from "./components/HeaderBar";
import CubeComponent from "./cube/CubeComponent";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import BeforeAfter from "./components/BeforeAfter/BeforeAfter";
import HowTo from "./components/HowTo/HowTo";
import Footer from "./components/Footer/Footer";
import Loader from "./Loader/Loader";

export default function HomeComponent() {
    return (
        <>
            <Loader />
            <HeaderBar />
            <CubeComponent />
            <div data-scroll-container>
                <Hero />
                <About />
                {/* <BeforeAfter />
                <HowTo /> */}
                <Footer />
            </div>
        </>
    );
} 