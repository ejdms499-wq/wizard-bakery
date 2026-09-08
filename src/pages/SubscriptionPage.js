import React from "react";
import Header from "../components/Header";
import SubscriptionDetail from "../components/SubscriptionDetail";
import Footer from "../components/Footer";

function SubscriptionPage() {
  return (
    <>
      <Header />

      <main>
        <SubscriptionDetail />
      </main>

      <Footer />
    </>
  );
}

export default SubscriptionPage;