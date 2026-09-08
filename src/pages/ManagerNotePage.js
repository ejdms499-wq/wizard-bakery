import React from "react";
import Header from "../components/Header";
import ManagerJournal from "../components/ManagerJournal";
import Footer from "../components/Footer";

function ManagerNotePage() {
  return (
    <>
      <Header />

      <main>
        <ManagerJournal />
      </main>

      <Footer />
    </>
  );
}

export default ManagerNotePage;