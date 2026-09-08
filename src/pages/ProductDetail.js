import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../css/ProductDetail.css";
import categoryProducts from "../db/categoryProducts.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { isWished, toggleWish } from "../utils/wishes";
import { isNotifying, toggleNotify } from "../utils/notifications";
import { addRecentlyViewed } from "../utils/recentlyViewed";
import RecentlyViewed from "../components/RecentlyViewed";

const categoryMeta = {
  mind: { label: "MIND", title: "마음을 다루는 빵" },
  relation: { label: "RELATION", title: "관계를 다루는 빵" },
  curse: { label: "CURSE", title: "저주 · 위험 품목" },
  sealed: { label: "SEALED", title: "봉인된 품목" },
  night: { label: "TONIGHT'S SELECTION", title: "오늘 밤의 진열", noCollectionSuffix: true },
};

const getCollectionLabel = (meta) => {
  if (!meta) return "";
  return meta.noCollectionSuffix ? meta.label : `${meta.label} COLLECTION`;
};

const tabs = [
  { id: "info", label: "상세정보" },
  { id: "ingredients", label: "재료 · 맛" },
  { id: "effect", label: "효과 · 주의" },
  { id: "traces", label: "그 후 이야기" },
];

const sealResponses = {
  "NOT FOR SALE": [
    "손잡이가 조금도 움직이지 않습니다.",
    "점장이 조용히 고개를 젓습니다.",
    "이유는 없습니다. 그냥 안 됩니다.",
  ],
  "SEALED": [
    "봉인 문양이 희미하게 빛났다가 다시 잠잠해집니다.",
    "지금은 열리지 않습니다.",
    "아직은, 때가 아닙니다.",
  ],
  "MANAGER ONLY": [
    "점장은 지금 자리에 없습니다.",
    "정중히 거절당했습니다.",
    "이 케이크는 오늘 밤의 손님을 위한 것이 아닙니다.",
  ],
};

const sealButtonLabel = {
  "NOT FOR SALE": "봉인 해제를 시도해보기",
  "SEALED": "봉인 해제를 시도해보기",
  "MANAGER ONLY": "점장에게 요청하기",
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("info");
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [alreadySignedToday, setAlreadySignedToday] = useState(false);
  const [signatureName, setSignatureName] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [signedName, setSignedName] = useState("");

  const [isAttempting, setIsAttempting] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [sealMessage, setSealMessage] = useState("");

  const [wished, setWished] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [traceIndex] = useState(() =>
    Math.floor(Math.random() * 100)
  );

  const product = categoryProducts.find(
    (item) => String(item.id) === id
  );

  useEffect(() => {
    if (product) {
      setWished(isWished(product.id));
      setNotifying(isNotifying(product.id));
      addRecentlyViewed(product.id);
    }
  }, [product]);

  const handleToggleWish = () => {
    if (!product) return;
    const next = toggleWish(product.id);
    setWished(next.includes(product.id));
  };

  const handleToggleNotify = () => {
    if (!product) return;
    const next = toggleNotify(product.id);
    setNotifying(next.includes(product.id));
  };

  if (!product) {
    return (
      <>
        <Header />

        <main className="product-detail product-detail-empty">
          <p>존재하지 않는 품목입니다.</p>

          <button
            type="button"
            className="product-detail-empty-back"
            onClick={() => navigate("/")}
          >
            홈으로 돌아가기
          </button>
        </main>

        <Footer />
      </>
    );
  }

  const meta = categoryMeta[product.category];
  const statusClass = product.status
    .toLowerCase()
    .replaceAll(" ", "-");
  const showBadge = product.status !== "AVAILABLE";
  const isHiddenEffect = product.status === "HIDDEN";

  const relatedProducts = categoryProducts
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  const CONTRACT_DATE_KEY = "wizardBakeryContractDate";
  const CONTRACT_NAME_KEY = "wizardBakeryContractName";

  const getTodayString = () => new Date().toDateString();

  const handleOpenContract = () => {
    const savedDate = localStorage.getItem(CONTRACT_DATE_KEY);
    const today = getTodayString();

    setIsSigning(false);
    setIsSigned(false);
    setSignatureName("");

    if (savedDate === today) {
      setAlreadySignedToday(true);
      setSignedName(localStorage.getItem(CONTRACT_NAME_KEY) || "");
    } else {
      setAlreadySignedToday(false);
    }

    setIsContractOpen(true);
  };

  const handleCloseContract = () => {
    setIsContractOpen(false);
  };

  const handleSign = () => {
    if (!signatureName.trim() || isSigning) {
      return;
    }

    setIsSigning(true);

    setTimeout(() => {
      localStorage.setItem(CONTRACT_DATE_KEY, getTodayString());
      localStorage.setItem(CONTRACT_NAME_KEY, signatureName.trim());

      setSignedName(signatureName.trim());
      setIsSigning(false);
      setIsSigned(true);
    }, 1300);
  };

  const handleSealAttempt = () => {
    if (isAttempting) {
      return;
    }

    setIsAttempting(true);

    setTimeout(() => {
      const pool =
        sealResponses[product.status] || sealResponses.SEALED;

      let next = pool[Math.floor(Math.random() * pool.length)];

      if (pool.length > 1) {
        while (next === sealMessage) {
          next = pool[Math.floor(Math.random() * pool.length)];
        }
      }

      setSealMessage(next);
      setIsAttempting(false);
      setIsShaking(true);

      setTimeout(() => setIsShaking(false), 500);
    }, 900);
  };

  return (
    <>
      <Header />

      <main className="product-detail">
        <div className="product-detail-inner">

          <nav className="product-detail-breadcrumb">
            <Link to="/">홈</Link>
            <span>/</span>
            <span>{meta ? getCollectionLabel(meta) : product.category.toUpperCase()}</span>
            <span>/</span>
            <span className="current">{product.name}</span>
          </nav>

          <button
            type="button"
            className="product-detail-back"
            onClick={() => navigate(-1)}
          >
            ← 진열대로 돌아가기
          </button>

          <div className="product-detail-grid">

            <div className="product-detail-image">
              {product.image ? (
                <button
                  type="button"
                  className="product-detail-image-zoom-trigger"
                  onClick={() => setIsZoomOpen(true)}
                  aria-label="이미지 확대"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <span className="product-detail-zoom-hint">
                    ⤢
                  </span>
                </button>
              ) : (
                <div
                  className={`product-detail-placeholder placeholder-${product.category}`}
                >
                  <span>{product.nameEn}</span>
                  <small>IMAGE IN PREPARATION</small>
                </div>
              )}

              {showBadge && (
                <span
                  className={`product-detail-status status-${statusClass}`}
                >
                  {product.status}
                </span>
              )}
            </div>

            <div className="product-detail-info">

              <p className="product-detail-category">
                {meta ? getCollectionLabel(meta) : product.category.toUpperCase()}
              </p>

              <p className="product-detail-en">
                {product.nameEn}
              </p>

              <div className="product-detail-name-row">
                <h1 className="product-detail-name">
                  {product.name}
                </h1>

                <button
                  type="button"
                  className={`product-detail-wish ${
                    wished ? "is-wished" : ""
                  }`}
                  onClick={handleToggleWish}
                  aria-pressed={wished}
                  aria-label="마음에 새기기"
                >
                  <span className="product-detail-wish-mark">
                    {wished ? "✦" : "✧"}
                  </span>
                </button>
              </div>

              <div className="product-detail-price-row">
                <span className="product-detail-price">
                  {product.price}
                </span>

                {product.size && (
                  <span className="product-detail-size">
                    {product.size}
                  </span>
                )}
              </div>

              <p className="product-detail-tagline">
                {product.tagline}
              </p>

              <div className="product-detail-tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`product-detail-tab ${
                      activeTab === tab.id ? "is-active" : ""
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="product-detail-tab-panel">

                {activeTab === "info" && (
                  <div>
                    {product.descriptionLong ? (
                      <p className="product-detail-description">
                        {product.descriptionLong}
                      </p>
                    ) : (
                      <p className="product-detail-description muted">
                        상세 설명은 준비 중입니다.
                      </p>
                    )}

                    {product.texture && (
                      <div className="product-detail-section">
                        <span className="product-detail-label">
                          TEXTURE
                        </span>

                        <p>{product.texture}</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "ingredients" && (
                  <div>
                    {product.taste && product.taste.length > 0 ? (
                      <div className="product-detail-section">
                        <span className="product-detail-label">
                          TASTING NOTE
                        </span>

                        <ul className="product-detail-taste-list">
                          {product.taste.map((note) => (
                            <li key={note}>{note}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="product-detail-description muted">
                        맛 노트는 준비 중입니다.
                      </p>
                    )}

                    {product.ingredients && product.ingredients.length > 0 && (
                      <div className="product-detail-section">
                        <span className="product-detail-label">
                          INGREDIENTS
                        </span>

                        <p className="product-detail-ingredients">
                          {product.ingredients.join(" · ")}
                        </p>
                      </div>
                    )}

                    {product.allergens && product.allergens.length > 0 && (
                      <p className="product-detail-allergens">
                        알레르기 유발 성분: {product.allergens.join(", ")}
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "effect" && (
                  <div>
                    {isHiddenEffect ? (
                      <p className="product-detail-description muted">
                        이 품목의 효과는 미리 공개되지 않습니다.
                        아래 "효과와 대가 확인하기"에서 서명해야만
                        알 수 있습니다.
                      </p>
                    ) : (
                      <>
                        <div className="product-detail-section">
                          <span className="product-detail-label">
                            EFFECT
                          </span>

                          <p>{product.effect}</p>
                        </div>

                        <div className="product-detail-section warning">
                          <span className="product-detail-label">
                            CAUTION
                          </span>

                          <p>{product.warning}</p>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeTab === "traces" && (
                  <div>
                    {product.traces && product.traces.length > 0 ? (
                      <div className="product-detail-trace">
                        <p className="product-detail-trace-mark">
                          “
                        </p>

                        <p className="product-detail-trace-text">
                          {
                            product.traces[
                              traceIndex % product.traces.length
                            ]
                          }
                        </p>

                        <p className="product-detail-trace-caption">
                          효과를 겪은 손님이 남긴 흔적입니다.
                          이름과 시점은 남지 않습니다.
                        </p>
                      </div>
                    ) : (
                      <p className="product-detail-description muted">
                        아직 남겨진 흔적이 없습니다.
                      </p>
                    )}
                  </div>
                )}

              </div>

              {product.status === "ORDER UNAVAILABLE" ? (
                <div className="product-detail-order">
                  <p className="product-detail-order-note">
                    이 품목은 현재 주문을 받지 않습니다.
                  </p>

                  <button
                    type="button"
                    className={`notify-button ${
                      notifying ? "is-notifying" : ""
                    }`}
                    onClick={handleToggleNotify}
                  >
                    {notifying
                      ? "알림 신청됨 · 취소하기"
                      : "다시 주문 가능해지면 알림 신청"}
                  </button>

                  {notifying && (
                    <p className="notify-message">
                      알림 신청이 접수되었습니다.
                      <br />
                      하지만 언제일지는 아무도 모릅니다.
                    </p>
                  )}
                </div>
              ) : product.category === "sealed" ? (
                <div className="seal-attempt-area">
                  <p className="product-detail-order-note">
                    이 품목은 일반 주문이 제한되어 있습니다.
                    다만, 봉인이 풀리는지 시도해볼 수는 있습니다.
                  </p>

                  <button
                    type="button"
                    className={`seal-attempt-button ${
                      isShaking ? "is-shaking" : ""
                    }`}
                    onClick={handleSealAttempt}
                    disabled={isAttempting}
                  >
                    {isAttempting
                      ? "시도하는 중…"
                      : sealButtonLabel[product.status] ||
                        "봉인 해제를 시도해보기"}
                  </button>

                  {sealMessage && (
                    <p className="seal-attempt-message">
                      {sealMessage}
                    </p>
                  )}

                  <button
                    type="button"
                    className={`notify-button ${
                      notifying ? "is-notifying" : ""
                    }`}
                    onClick={handleToggleNotify}
                  >
                    {notifying
                      ? "알림 신청됨 · 취소하기"
                      : "봉인 해제 알림 신청"}
                  </button>

                  {notifying && (
                    <p className="notify-message">
                      알림 신청이 접수되었습니다.
                      <br />
                      하지만 언제일지는 아무도 모릅니다.
                    </p>
                  )}
                </div>
              ) : (
                <div className="product-detail-order">

                  <p className="product-detail-order-note">
                    이 품목은 오늘 밤의 진열이 아니라
                    상시 열람 가능한 안내 목록입니다.
                  </p>

                  <button
                    type="button"
                    className="product-detail-order-button"
                    onClick={handleOpenContract}
                  >
                    효과와 대가 확인하기
                  </button>

                </div>
              )}

            </div>

          </div>

          {isZoomOpen && (
            <div
              className="image-zoom-backdrop"
              onClick={() => setIsZoomOpen(false)}
            >
              <button
                type="button"
                className="image-zoom-close"
                onClick={() => setIsZoomOpen(false)}
                aria-label="닫기"
              >
                ×
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="image-zoom-full"
                onClick={(event) => event.stopPropagation()}
              />
            </div>
          )}

          {isContractOpen && (
            <div
              className="contract-backdrop"
              onClick={handleCloseContract}
            >
              <div
                className="contract-box"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="contract-close"
                  onClick={handleCloseContract}
                  aria-label="닫기"
                >
                  ×
                </button>

                <p className="contract-eyebrow">
                  WIZARD BAKERY · 대가 확인서
                </p>

                <h3 className="contract-name">
                  {product.name}
                </h3>

                {alreadySignedToday ? (
                  <p className="contract-locked-message">
                    {signedName ? `${signedName}님, ` : ""}
                    오늘의 계약은 이미 끝났습니다.
                    <br />
                    자정이 지나야 새로운 대가를 받을 수 있습니다.
                  </p>
                ) : (
                  <>
                    {(!isHiddenEffect || isSigned) && (
                      <>
                        <div className="contract-section">
                          <span className="product-detail-label">
                            EFFECT
                          </span>
                          <p>{product.effect}</p>
                        </div>

                        <div className="contract-section warning">
                          <span className="product-detail-label">
                            CAUTION
                          </span>
                          <p>{product.warning}</p>
                        </div>
                      </>
                    )}

                    {isHiddenEffect && !isSigned && (
                      <p className="contract-hidden-note">
                        효과는 서명과 동시에 공개됩니다.
                        <br />
                        지금은 아무것도 확인할 수 없습니다.
                      </p>
                    )}

                    {!isSigned ? (
                      <div className="contract-sign-area">
                        <input
                          type="text"
                          className="contract-name-input"
                          placeholder="계약서에 남길 이름을 적어주세요"
                          value={signatureName}
                          onChange={(event) =>
                            setSignatureName(event.target.value)
                          }
                          disabled={isSigning}
                        />

                        <button
                          type="button"
                          className="contract-sign-button"
                          onClick={handleSign}
                          disabled={!signatureName.trim() || isSigning}
                        >
                          {isSigning
                            ? "서명이 새겨지는 중입니다…"
                            : "대가를 감수하고 서명합니다"}
                        </button>
                      </div>
                    ) : (
                      <p className="contract-signed-message">
                        {signedName}님과의 계약이 성립되었습니다.
                        <br />
                        대가는 이미 정해져 있습니다.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {relatedProducts.length > 0 && (
            <section className="product-detail-related">
              <p className="product-detail-related-label">
                {meta ? meta.title : ""}의 다른 품목
              </p>

              <div className="product-detail-related-grid">
                {relatedProducts.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="product-detail-related-card"
                  >
                    <div className="product-detail-related-image">
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className="product-detail-related-placeholder">
                          <span>{item.nameEn}</span>
                        </div>
                      )}
                    </div>

                    <p className="product-detail-related-name">
                      {item.name}
                    </p>

                    <span className="product-detail-related-price">
                      {item.price}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <RecentlyViewed excludeId={product.id} />

      <Footer />
    </>
  );
}

export default ProductDetail;