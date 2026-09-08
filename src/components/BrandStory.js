import React from "react";
import "../css/BrandStory.css";
import brandData from "../db/brand.json";

const chapters = [
  {
    number: "01",
    title: "왜 굳이 빵인가",
    body:
      "마법은 대개 화려한 형태로 그려지지만, 이곳의 마법은 늘 평범한 얼굴을 하고 있습니다. 잘 구운 빵 한 조각처럼, 손에 쥐면 따뜻하고 익숙한 모습으로요. 효과는 설명을 읽어야만 보이고, 대가는 늘 그 뒤에 조용히 붙어 있습니다.",
  },
  {
    number: "02",
    title: "이곳에 대하여",
    body:
      "간판은 없습니다. 낮에 이 골목을 지나는 사람은 이 가게를 알아보지 못합니다. 문은 자정이 지나야 열리고, 그마저도 정말 필요한 사람에게만 보인다고 합니다.",
  },
];

const rules = [
  "모든 품목에는 효과와 대가가 함께 있습니다.",
  "봉인된 것에는 그럴 만한 이유가 있습니다.",
  "이미 시작된 효과는 되돌릴 수 없습니다.",
];

function BrandStory() {
  const brand = brandData.brand;

  return (
    <section className="brand-story" id="story">
      <div className="brand-story-inner">

        <header className="brand-story-head">
          <img
            src={brand.emblem}
            alt="위저드 베이커리"
            className="brand-story-emblem"
          />

          <p className="brand-story-eyebrow">BRAND STORY</p>

          <h2 className="brand-story-title">
            이곳이 언제 생겼는지는,
            <br />
            아무도 정확히 모릅니다.
          </h2>
        </header>

        <div className="brand-story-chapters">
          {chapters.map((chapter) => (
            <article
              className="brand-story-chapter"
              key={chapter.number}
            >
              <span className="brand-story-number">
                {chapter.number}
              </span>

              <div>
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="brand-story-quote">
          <p className="brand-story-quote-mark">“</p>

          <p className="brand-story-quote-text">
            효과가 있는 만큼, 대가도 분명합니다.
          </p>

          <p className="brand-story-quote-caption">
            가게 안쪽 벽에 붙어 있는 유일한 문구입니다.
          </p>
        </div>

        <div className="brand-story-rules">
          <p className="brand-story-rules-label">
            이곳의 규칙
          </p>

          <ol>
            {rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ol>
        </div>

        <p className="brand-story-closing">
          위험한 소원이 이루어지는 곳.
          <br />
          오늘 밤도, 문은 조용히 열려 있습니다.
        </p>

      </div>
    </section>
  );
}

export default BrandStory;