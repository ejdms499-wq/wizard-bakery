import React from "react";
import Header from "../components/Header";
import WishList from "../components/WishList";
import Footer from "../components/Footer";

function WishesPage() {
  return (
    <>
      <Header />

      <main>
        <WishList />
      </main>

      <Footer />
    </>
  );
}

export default WishesPage;