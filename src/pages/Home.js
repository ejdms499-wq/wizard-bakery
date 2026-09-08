import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Shelf from "../components/Shelf";
import FeaturedProducts from "../components/FeaturedProducts";
import ManagerNote from "../components/ManagerNote";

import BakeryNews from "../components/BakeryNews";

import VisitSection from "../components/VisitSection";
import Footer from "../components/Footer";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;

      requestAnimationFrame(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.state]);

  return (
    <>
      <Header />

      <main>
        <Hero />
        <Shelf />
        <FeaturedProducts />
        <ManagerNote />

        <BakeryNews />

        <VisitSection />
      </main>

      <Footer />
    </>
  );
}

export default Home;