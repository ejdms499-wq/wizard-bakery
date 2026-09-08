import React from "react";
import Header from "../components/Header";
import BrandStory from "../components/BrandStory";
import Footer from "../components/Footer";

function BrandStoryPage() {
  return (
    <>
      <Header />

      <main>
        <BrandStory />
      </main>

      <Footer />
    </>
  );
}

export default BrandStoryPage;