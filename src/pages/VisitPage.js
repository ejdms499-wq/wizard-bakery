import React from "react";
import Header from "../components/Header";
import VisitDetail from "../components/VisitDetail";
import Footer from "../components/Footer";

function VisitPage() {
  return (
    <>
      <Header />

      <main>
        <VisitDetail />
      </main>

      <Footer />
    </>
  );
}

export default VisitPage;