import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/VisitSection.css";

function VisitSection() {
  const navigate = useNavigate();

  return (
    <section className="visit-section" id="visit">
      <div className="visit-inner">

        <div className="visit-left">
          <p className="visit-eyebrow">
            VISIT WIZARD BAKERY
          </p>

          <p className="visit-open">
            <span></span>
            OPEN TONIGHT
          </p>

          <h2>
            오늘 밤의
            <br />
            영업 안내
          </h2>

          <p className="visit-copy">
            필요한 밤에만 찾을 수 있는 작은 베이커리입니다.
          </p>
        </div>

        <div className="visit-right">

          <div className="visit-info-row">
            <span className="visit-info-label">
              HOURS
            </span>

            <p>
              자정 — 새벽 4시
            </p>
          </div>

          <div className="visit-info-row">
            <span className="visit-info-label">
              LOCATION
            </span>

            <p>
              정해진 주소는 없습니다.
              <br />
              찾아오는 사람에게만 문이 열립니다.
            </p>
          </div>

          <div className="visit-info-row">
            <span className="visit-info-label">
              ORDER
            </span>

            <p>
              방문 전 오늘의 진열을 확인해주세요.
            </p>
          </div>

          <button
            type="button"
            className="visit-more"
            onClick={() => navigate("/visit")}
          >
            <span>방문 안내 자세히 보기</span>
            <span>→</span>
          </button>

        </div>

      </div>
    </section>
  );
}

export default VisitSection;