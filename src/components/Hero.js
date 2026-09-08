import React, { useState, useEffect } from "react";
import "../css/Hero.css";
import brandData from "../db/brand.json";
import { getTodaySeedNumber } from "../utils/visitorCount";

function Hero() {
  const brand = brandData.brand;
  const hero = brandData.hero;

  const [visitorCount, setVisitorCount] = useState(() =>
    getTodaySeedNumber(28, 96)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() < 0.5) {
        setVisitorCount((current) => current + 1);
      }
    }, 6000 + Math.random() * 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="top">

      <div className="hero-background">

        <div className="hero-center-light"></div>

        {/* 왼쪽 실제 안개 영상 */}
        <div className="fog-video-wrap fog-video-left">
          <video
            className="fog-video"
            src="/video/fog.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* 오른쪽 - 같은 영상 좌우 반전 */}
        <div className="fog-video-wrap fog-video-right">
          <video
            className="fog-video fog-video-mirror"
            src="/video/fog.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        <span className="hero-star hero-star-01">✦</span>
        <span className="hero-star hero-star-02">✦</span>
        <span className="hero-star hero-star-03">·</span>

      </div>


      <div className="hero-content">

        <p className="hero-eyebrow">
          {hero.eyebrow}
        </p>

        <p className="hero-visitor-count">
          <span className="hero-visitor-dot"></span>
          오늘 밤 다녀간 손님 {visitorCount}명
        </p>


        <div className="hero-emblem-wrap">
          <img
            src={brand.emblem}
            alt="위저드 베이커리"
            className="hero-emblem"
          />
        </div>


        <h1 className="hero-title">
          {brand.name}
        </h1>


        <p className="hero-korean">
          {brand.nameKo}
        </p>


        <div className="hero-decoration">
          <span></span>
          <b>✦</b>
          <span></span>
        </div>


        <p className="hero-tagline">
          {brand.tagline}
        </p>


        <div className="hero-copy">

          <p className="hero-copy-main">
            {hero.headline}
          </p>

          <p className="hero-copy-sub">
            {hero.subline}
          </p>

        </div>


        <div className="hero-manager">

          <span className="hero-manager-label">
            {hero.managerLabel}
          </span>

          <span className="hero-manager-divider"></span>

          <span className="hero-manager-text">
            {hero.managerNote}
          </span>

        </div>


        <div className="hero-cta-area">

          <a
            href={hero.buttonLink}
            className="hero-cta"
            onClick={(event) => {
              if (hero.buttonLink.startsWith("#")) {
                event.preventDefault();

                document
                  .getElementById(hero.buttonLink.slice(1))
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span>{hero.button}</span>
            <span className="hero-cta-arrow">→</span>
          </a>

        </div>

      </div>


      <div className="hero-scroll">
        <span className="hero-scroll-bar"></span>
        <span>SCROLL</span>
      </div>

    </section>
  );
}

export default Hero;