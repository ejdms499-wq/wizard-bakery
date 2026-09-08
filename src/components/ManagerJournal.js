import React, { useState, useEffect } from "react";
import "../css/ManagerJournal.css";

const entries = [
  {
    date: "09.03",
    body:
      "오늘 밤은 유난히 조용합니다. 조용한 밤일수록, 정말 필요한 사람만 문을 두드립니다.",
  },
  {
    date: "08.28",
    body:
      "효과보다 대가를 먼저 읽는 손님이 늘었습니다. 나쁜 변화는 아닙니다.",
  },
  {
    date: "08.14",
    body:
      "봉인은 풀라고 있는 게 아닙니다. 다만 왜 풀리지 않는지는, 묻는 손님에 따라 다르게 설명합니다.",
  },
  {
    date: "07.30",
    body:
      "같은 실수를 두 번 하는 손님은 드뭅니다. 대부분 한 번으로 충분하다고들 합니다.",
  },
  {
    date: "07.19",
    body:
      "문은 늦게 열리지만, 늦게 닫히지는 않습니다. 자정과 새벽 사이, 그 정도의 시간입니다.",
  },
  {
    date: "07.02",
    body:
      "오늘도 몇 명은 다시 오지 않을 겁니다. 원하는 걸 얻었기 때문일 수도, 아닐 수도 있습니다.",
  },
];

const DRAW_DATE_KEY = "wizardBakeryJournalDrawDate";
const DRAW_INDEX_KEY = "wizardBakeryJournalDrawIndex";

const OPEN_START_HOUR = 0;
const OPEN_END_HOUR = 6;

const getTodayString = () => new Date().toDateString();

function getMsUntilNextOpen(now) {
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return next.getTime() - now.getTime();
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function ManagerJournal() {
  const [now, setNow] = useState(new Date());
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnIndex, setDrawnIndex] = useState(null);
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedDate = localStorage.getItem(DRAW_DATE_KEY);

    if (savedDate === getTodayString()) {
      const savedIndex = Number(
        localStorage.getItem(DRAW_INDEX_KEY)
      );

      if (!Number.isNaN(savedIndex)) {
        setDrawnIndex(savedIndex);
      }
    }
  }, []);

  const currentHour = now.getHours();
  const isOpenHours =
    currentHour >= OPEN_START_HOUR && currentHour < OPEN_END_HOUR;

  const handleDraw = () => {
    if (isDrawing || drawnIndex !== null || !isOpenHours) {
      return;
    }

    setIsDrawing(true);

    setTimeout(() => {
      const index = Math.floor(Math.random() * entries.length);

      localStorage.setItem(DRAW_DATE_KEY, getTodayString());
      localStorage.setItem(DRAW_INDEX_KEY, String(index));

      setDrawnIndex(index);
      setIsDrawing(false);
    }, 1100);
  };

  return (
    <section className="manager-journal" id="journal">
      <div className="manager-journal-inner">

        <header className="manager-journal-head">
          <p className="manager-journal-eyebrow">
            MANAGER'S JOURNAL
          </p>

          <h2 className="manager-journal-title">
            점장의 노트
          </h2>

          <p className="manager-journal-intro">
            이 노트는 자정과 새벽 사이에만 남겨집니다.
            <br />
            낮에는 어제까지 남겨진 기록만 확인할 수 있습니다.
          </p>
        </header>

        <div className="journal-draw">
          {drawnIndex !== null ? (
            <div className="journal-draw-result">
              <p className="journal-draw-result-date">
                {entries[drawnIndex].date}
              </p>

              <p className="journal-draw-result-body">
                {entries[drawnIndex].body}
              </p>

              <p className="journal-draw-result-note">
                오늘 뽑을 수 있는 쪽지는 이것뿐입니다.
                <br />
                다음 쪽지는 자정이 지나야 다시 뽑을 수 있습니다.
              </p>
            </div>
          ) : isOpenHours ? (
            <button
              type="button"
              className={`journal-draw-seal ${
                isDrawing ? "is-drawing" : ""
              }`}
              onClick={handleDraw}
              disabled={isDrawing}
            >
              <span className="journal-draw-seal-mark">✦</span>
              <span className="journal-draw-seal-label">
                {isDrawing
                  ? "봉인을 여는 중…"
                  : "오늘의 노트 뽑기"}
              </span>
            </button>
          ) : (
            <div className="journal-draw-locked">
              <p className="journal-draw-locked-label">
                지금은 낮입니다
              </p>

              <p className="journal-draw-locked-timer">
                {formatDuration(getMsUntilNextOpen(now))}
              </p>

              <p className="journal-draw-locked-note">
                문이 열리기까지 남은 시간입니다.
                <br />
                자정이 지나면 노트를 뽑을 수 있습니다.
              </p>
            </div>
          )}
        </div>

        <button
          type="button"
          className="journal-archive-toggle"
          onClick={() => setShowArchive((current) => !current)}
        >
          {showArchive
            ? "지난 기록 접기"
            : "지난 기록 전체 보기"}
        </button>

        {showArchive && (
          <div className="manager-journal-list">
            {entries.map((entry) => (
              <article
                className="manager-journal-entry"
                key={entry.date}
              >
                <span className="manager-journal-date">
                  {entry.date}
                </span>

                <p className="manager-journal-body">
                  {entry.body}
                </p>
              </article>
            ))}
          </div>
        )}

        <p className="manager-journal-footnote">
          다음 기록은 예고 없이 올라옵니다.
        </p>

      </div>
    </section>
  );
}

export default ManagerJournal;