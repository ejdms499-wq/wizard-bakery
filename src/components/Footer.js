import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Footer.css";

function Footer() {
  const navigate = useNavigate();

  const goTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <footer className="wizard-footer">
      <div className="wizard-footer-inner">

        <div className="wizard-footer-top">

          <div className="wizard-footer-brand">
            <p className="wizard-footer-logo">
              WIZARD BAKERY
            </p>

            <p className="wizard-footer-ko">
              위저드 베이커리
            </p>

            <p className="wizard-footer-message">
              FOR A MORE
              <br />
              MAGICAL TOMORROW.
            </p>
          </div>

          <div className="wizard-footer-nav">

            <div>
              <span>MENU</span>

              <button onClick={() => goTo("featured")}>
                오늘의 진열
              </button>

              <button onClick={() => goTo("shelf")}>
                효과별 진열
              </button>

              <button onClick={() => navigate("/subscription")}>
                정기 계약
              </button>
            </div>

            <div>
              <span>INFORMATION</span>

              <button onClick={() => navigate("/story")}>
                브랜드 스토리
              </button>

              <button onClick={() => navigate("/journal")}>
                점장의 노트
              </button>

              <button onClick={() => navigate("/visit")}>
                방문 안내
              </button>
            </div>

          </div>

        </div>

        <div className="wizard-footer-bottom">

          <p>
            구병모 『위저드 베이커리』를 재해석한
            비상업적 포트폴리오 프로젝트입니다.
          </p>

          <div>
            <span>OPEN AFTER MIDNIGHT</span>
            <span>© 2026 WIZARD BAKERY</span>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;