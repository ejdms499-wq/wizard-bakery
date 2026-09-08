import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/NotFoundPage.css";

function NotFoundPage() {
  return (
    <>
      <Header />

      <main className="not-found">
        <div className="not-found-inner">
          <p className="not-found-eyebrow">
            NO SUCH DOOR
          </p>

          <h1 className="not-found-title">
            이런 문은 없습니다.
          </h1>

          <p className="not-found-copy">
            찾으시는 곳은 여기에 없거나, 아직 열리지 않았습니다.
            <br />
            주소를 다시 확인해주세요.
          </p>

          <Link to="/" className="not-found-link">
            <span>진열대로 돌아가기</span>
            <span>→</span>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default NotFoundPage;