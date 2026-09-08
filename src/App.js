import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import BrandStoryPage from "./pages/BrandStoryPage";
import ManagerNotePage from "./pages/ManagerNotePage";
import VisitPage from "./pages/VisitPage";
import WishesPage from "./pages/WishesPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import NotFoundPage from "./pages/NotFoundPage";
import ContractToast from "./components/ContractToast";
import GlobalFog from "./components/GlobalFog";

function App() {
  return (
    <HashRouter>
      <GlobalFog />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/story" element={<BrandStoryPage />} />
        <Route path="/journal" element={<ManagerNotePage />} />
        <Route path="/visit" element={<VisitPage />} />
        <Route path="/wishes" element={<WishesPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ContractToast />
    </HashRouter>
  );
}

export default App;