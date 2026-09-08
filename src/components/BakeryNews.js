import React, { useState } from "react";

const newsData = [
  {
    id: 1,
    date: "09.07",
    category: "STORE",
    title: "보름달이 뜨는 밤에는 쉬어갑니다.",
    description:
      "한 달에 단 하루, 보름달이 뜨는 밤에는 주문을 받지 않습니다. 다음 영업은 이튿날 자정부터 시작합니다.",
  },
  {
    id: 2,
    date: "08.22",
    category: "NEW ITEM",
    title: "새로운 품목이 진열되었습니다.",
    description:
      "오늘 밤부터 새로운 품목이 진열됩니다. 일부 품목은 점장의 확인 후에만 주문할 수 있습니다.",
  },
  {
    id: 3,
    date: "08.03",
    category: "NOTICE",
    title: "주문 전 주의사항을 확인해주세요.",
    description:
      "모든 품목에는 서로 다른 효과와 대가가 있습니다. 효과가 시작된 뒤에는 되돌릴 수 없습니다.",
  },
];

const categoryColors = {
  STORE: "#b9793d",
  "NEW ITEM": "#e0b98a",
  NOTICE: "#8a6a4a",
};

// 오늘 날짜 기준 달의 위상을 0~1 사이 값으로 계산 (0=삭, 0.5=보름, 1=다음 삭)
function getMoonPhaseFraction(date) {
  const lp = 2551443; // 삭망월 (초)
  const newMoon = new Date(2000, 0, 6, 18, 14, 0).getTime() / 1000;
  const phase =
    ((date.getTime() / 1000 - newMoon) % lp) / lp;
  return phase < 0 ? phase + 1 : phase;
}

function buildMoonPath(phase, size) {
  const r = size / 2;
  const theta = phase * 2 * Math.PI;
  const rx = r * Math.cos(theta);
  const sweep1 = phase < 0.5 ? 1 : 0;
  const sweep2 = phase < 0.5 ? 0 : 1;
  return `M ${r},0 A ${Math.abs(rx)},${r} 0 0 ${sweep1} ${r},${size} A ${r},${r} 0 0 ${sweep2} ${r},0 Z`;
}

function MoonPhaseIcon({ size = 20 }) {
  const phase = getMoonPhaseFraction(new Date());

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="bakery-news-moon"
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 1}
        fill="none"
        stroke="rgba(246,240,232,0.25)"
        strokeWidth="1"
      />
      <path d={buildMoonPath(phase, size)} fill="#f6f0e8" />
    </svg>
  );
}

function BakeryNews() {
  const [activeId, setActiveId] = useState(null);

  return (
    <>
      <style>{`
        .bakery-news {
          width: 100%;
          padding: 110px 0 120px;
          background: #0c0917;
          border-top: 1px solid rgba(255,255,255,0.055);
          box-sizing: border-box;
        }

        .bakery-news * {
          box-sizing: border-box;
        }

        .bakery-news-inner {
          width: min(1180px, calc(100% - 80px));
          margin: 0 auto;
        }

        .bakery-news-head {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: end;
          gap: 80px;
          margin-bottom: 48px;
        }

        .bakery-news-eyebrow {
          margin: 0 0 15px;
          font-family: Inter, sans-serif;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.3em;
          color: #b9793d;
        }

        .bakery-news-head h2 {
          margin: 0;
          font-family: MaruBuri, "Noto Serif KR", serif;
          font-size: 35px;
          font-weight: 400;
          line-height: 1.35;
          letter-spacing: -0.05em;
          color: rgba(246,240,232,0.94);
        }

        .bakery-news-intro-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
        }

        .bakery-news-intro {
          margin: 0;
          justify-self: end;
          font-family: SUIT, Pretendard, sans-serif;
          font-size: 11px;
          line-height: 1.8;
          color: rgba(236,229,221,0.32);
        }

        .bakery-news-moon {
          flex-shrink: 0;
          opacity: 0.85;
        }

        .bakery-news-list {
          position: relative;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .bakery-news-list::before {
          content: "";
          position: absolute;
          left: 3px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(255,255,255,0.08);
        }

        .bakery-news-item {
          border-bottom: 1px solid rgba(255,255,255,0.075);
        }

        .bakery-news-button {
          all: unset;
          width: 100%;
          min-height: 84px;
          padding: 0 5px;
          display: grid;
          grid-template-columns: 24px 80px 110px 1fr 30px;
          align-items: center;
          gap: 20px;
          cursor: pointer;
          box-sizing: border-box;
          transition: padding 0.25s ease, background 0.25s ease;
        }

        .bakery-news-button:hover {
          padding-left: 15px;
          background: rgba(255,255,255,0.014);
        }

        .bakery-news-marker {
          position: relative;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--dot-color, #b9793d);
          opacity: 0.75;
          box-shadow: 0 0 0 4px #0c0917;
          transition: box-shadow 0.25s ease, opacity 0.25s ease;
        }

        .bakery-news-button:hover .bakery-news-marker {
          opacity: 1;
          box-shadow: 0 0 0 4px #0c0917, 0 0 10px rgba(185,121,61,0.5);
        }

        .bakery-news-date {
          font-family: Inter, sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #b9793d;
        }

        .bakery-news-category {
          font-family: Inter, sans-serif;
          font-size: 7px;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.3);
          transition: color 0.25s ease;
        }

        .bakery-news-button:hover .bakery-news-category {
          color: rgba(255,255,255,0.5);
        }

        .bakery-news-title {
          font-family: SUIT, Pretendard, sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.03em;
          color: rgba(245,239,232,0.75);
          transition: color 0.2s ease;
        }

        .bakery-news-button:hover .bakery-news-title {
          color: #f5efe7;
        }

        .bakery-news-arrow {
          justify-self: end;
          font-family: Inter, sans-serif;
          font-size: 15px;
          font-weight: 300;
          color: rgba(255,255,255,0.3);
          transition: transform 0.25s ease, color 0.25s ease;
        }

        .bakery-news-item.active .bakery-news-arrow {
          transform: rotate(45deg);
          color: #b9793d;
        }

        .bakery-news-detail {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition: grid-template-rows 0.35s ease, opacity 0.3s ease;
        }

        .bakery-news-item.active .bakery-news-detail {
          grid-template-rows: 1fr;
          opacity: 1;
        }

        .bakery-news-detail-inner {
          overflow: hidden;
        }

        .bakery-news-detail p {
          max-width: 700px;
          margin: 0;
          padding: 0 0 30px 234px;
          font-family: SUIT, Pretendard, sans-serif;
          font-size: 11px;
          line-height: 1.9;
          color: rgba(237,230,222,0.4);
        }

        @media (max-width: 768px) {
          .bakery-news {
            padding: 80px 0;
          }

          .bakery-news-inner {
            width: calc(100% - 40px);
          }

          .bakery-news-head {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .bakery-news-intro-row {
            justify-content: flex-start;
          }

          .bakery-news-button {
            grid-template-columns: 16px 55px 1fr 24px;
          }

          .bakery-news-category {
            display: none;
          }

          .bakery-news-detail p {
            padding-left: 71px;
          }

          .bakery-news-list::before {
            left: 2px;
          }
        }
      `}</style>

      <section className="bakery-news" id="night-board">
        <div className="bakery-news-inner">

          <header className="bakery-news-head">
            <div>
              <p className="bakery-news-eyebrow">
                FROM THE BAKERY
              </p>

              <h2>베이커리 소식</h2>
            </div>

            <div className="bakery-news-intro-row">
              <p className="bakery-news-intro">
                오늘 밤의 영업과 진열에 관한 소식입니다.
              </p>
              <MoonPhaseIcon />
            </div>
          </header>

          <div className="bakery-news-list">
            {newsData.map((item) => {
              const active = activeId === item.id;
              const color = categoryColors[item.category];

              return (
                <article
                  key={item.id}
                  className={`bakery-news-item ${
                    active ? "active" : ""
                  }`}
                  style={{ "--dot-color": color }}
                >
                  <button
                    type="button"
                    className="bakery-news-button"
                    onClick={() =>
                      setActiveId(active ? null : item.id)
                    }
                  >
                    <span className="bakery-news-marker" />

                    <span className="bakery-news-date">
                      {item.date}
                    </span>

                    <span className="bakery-news-category">
                      {item.category}
                    </span>

                    <span className="bakery-news-title">
                      {item.title}
                    </span>

                    <span className="bakery-news-arrow">
                      +
                    </span>
                  </button>

                  <div className="bakery-news-detail">
                    <div className="bakery-news-detail-inner">
                      <p>{item.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}

export default BakeryNews;