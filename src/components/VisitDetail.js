import React, { useState } from "react";
import "../css/VisitDetail.css";

const steps = [
  {
    number: "01",
    title: "자정이 지날 때까지 기다립니다",
    body: "이 가게는 자정 이전에는 존재하지 않는 것처럼 보입니다. 시계를 먼저 확인해주세요.",
  },
  {
    number: "02",
    title: "정말 필요한 마음으로 걷습니다",
    body: "구경하러 오는 걸음과 필요해서 오는 걸음은 다르게 읽힌다고 합니다.",
  },
  {
    number: "03",
    title: "문이 보이면, 그때가 맞는 때입니다",
    body: "간판은 없지만 문은 있습니다. 보이지 않았다면, 아직은 때가 아닌 겁니다.",
  },
];

const faqs = [
  {
    q: "예약이 필요한가요?",
    a: "예약은 받지 않습니다. 대신 오늘 밤 진열된 품목은 사이트에서 미리 확인할 수 있습니다.",
  },
  {
    q: "포장이나 배달이 되나요?",
    a: "포장은 가능하지만 배달은 하지 않습니다. 대가가 있는 품목일수록 직접 받아 가시는 걸 권합니다.",
  },
  {
    q: "카드 결제가 되나요?",
    a: "결제 방식은 손님마다 다르게 요구됩니다. 매장에서 직접 안내받으시는 걸 권합니다.",
  },
  {
    q: "낮에는 정말 못 들어가나요?",
    a: "낮에는 이 페이지의 안내 문구조차 다르게 보인다는 손님들이 있었습니다.",
  },
];

function VisitDetail() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="visit-detail">
      <div className="visit-detail-inner">

        <header className="visit-detail-head">
          <p className="visit-detail-eyebrow">
            VISIT WIZARD BAKERY
          </p>

          <h1 className="visit-detail-title">
            찾아오시는 길
          </h1>

          <p className="visit-detail-intro">
            정해진 주소는 없습니다. 다만 몇 가지는 정해져 있습니다.
          </p>
        </header>

        <div className="visit-detail-info-grid">
          <div className="visit-detail-info-card">
            <span className="visit-detail-info-label">
              HOURS
            </span>

            <p>자정 — 새벽 4시</p>

            <p className="visit-detail-info-sub">
              이 시간 밖에는 문이 존재하지 않는 것으로 취급됩니다.
            </p>
          </div>

          <div className="visit-detail-info-card">
            <span className="visit-detail-info-label">
              LOCATION
            </span>

            <p>정해진 주소는 없습니다.</p>

            <p className="visit-detail-info-sub">
              찾아오는 사람에게만, 걸어오는 골목 어딘가에서 문이 열립니다.
            </p>
          </div>

          <div className="visit-detail-info-card">
            <span className="visit-detail-info-label">
              ORDER
            </span>

            <p>방문 전 오늘의 진열을 확인해주세요.</p>

            <p className="visit-detail-info-sub">
              모든 품목이 매일 밤 같은 자리에 있는 것은 아닙니다.
            </p>
          </div>
        </div>

        <div className="visit-detail-steps">
          <p className="visit-detail-section-label">
            찾아오는 법
          </p>

          {steps.map((step) => (
            <div className="visit-detail-step" key={step.number}>
              <span className="visit-detail-step-number">
                {step.number}
              </span>

              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="visit-detail-faq">
          <p className="visit-detail-section-label">
            자주 묻는 질문
          </p>

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                className={`visit-detail-faq-item ${
                  isOpen ? "is-open" : ""
                }`}
                key={faq.q}
              >
                <button
                  type="button"
                  className="visit-detail-faq-question"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                >
                  <span>{faq.q}</span>
                  <span>{isOpen ? "−" : "+"}</span>
                </button>

                <div className="visit-detail-faq-answer">
                  <div className="visit-detail-faq-answer-inner">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="visit-detail-closing">
          오늘 밤도, 문은 조용히 열려 있습니다.
        </p>

      </div>
    </section>
  );
}

export default VisitDetail;