import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Shelf.css";
import categoryProducts from "../db/categoryProducts.json";

function MindIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 24C12.5 16.5 17.5 13 24 13C30.5 13 35.5 16.5 40 24C35.5 31.5 30.5 35 24 35C17.5 35 12.5 31.5 8 24Z" />
      <circle cx="24" cy="24" r="4" />
    </svg>
  );
}

function RelationIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M10 24C14 16 18 16 24 24C30 32 34 32 38 24" />
      <path d="M10 24C14 32 18 32 24 24C30 16 34 16 38 24" />
    </svg>
  );
}

function CurseIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M13 13L35 35" />
      <path d="M35 13L13 35" />
      <path d="M24 7V12" />
      <path d="M24 36V41" />
      <path d="M7 24H12" />
      <path d="M36 24H41" />
    </svg>
  );
}

function SealedIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M32 10C24 11 18 17 18 24C18 31 24 37 32 38C28 40 24 41 20 39.5C12.5 37 8 31 8 24C8 17 12.5 11 20 8.5C24 7 28 8 32 10Z" />
      <circle cx="35.5" cy="15.5" r="1.2" />
    </svg>
  );
}

const popularSearchTerms = ["불안", "기억", "관계", "저주", "봉인", "소원"];

const sortOptions = [
  { id: "default", label: "기본 순서" },
  { id: "price-asc", label: "가격 낮은순" },
  { id: "price-desc", label: "가격 높은순" },
  { id: "name-asc", label: "이름순" },
];

function parsePrice(priceStr) {
  const digits = String(priceStr).replace(/[^0-9]/g, "");
  return digits ? Number(digits) : null;
}

function sortProducts(products, sortOrder) {
  if (sortOrder === "default") {
    return products;
  }

  const sorted = [...products];

  if (sortOrder === "name-asc") {
    sorted.sort((a, b) => a.name.localeCompare(b.name, "ko"));
    return sorted;
  }

  sorted.sort((a, b) => {
    const priceA = parsePrice(a.price);
    const priceB = parsePrice(b.price);

    if (priceA === null && priceB === null) return 0;
    if (priceA === null) return 1;
    if (priceB === null) return -1;

    return sortOrder === "price-asc"
      ? priceA - priceB
      : priceB - priceA;
  });

  return sorted;
}

const categories = [
  {
    id: "mind",
    number: "01",
    label: "MIND",
    title: "마음을 다루는 빵",
    description:
      "불안, 긴장, 기억, 후회처럼 먹은 사람 자신의 마음에 작용합니다.",
    icon: <MindIcon />,
  },
  {
    id: "relation",
    number: "02",
    label: "RELATION",
    title: "관계를 다루는 빵",
    description:
      "사랑, 미련, 화해와 집착처럼 두 사람 사이의 감정을 다룹니다.",
    icon: <RelationIcon />,
  },
  {
    id: "curse",
    number: "03",
    label: "CURSE",
    title: "저주 · 위험 품목",
    description:
      "보기에는 평범하지만 다른 사람의 하루와 선택에 영향을 줄 수 있습니다.",
    icon: <CurseIcon />,
  },
  {
    id: "sealed",
    number: "04",
    label: "SEALED",
    title: "봉인된 품목",
    description:
      "일반 주문이 제한되었거나 현재 판매하지 않는 품목입니다.",
    icon: <SealedIcon />,
  },
];

function Shelf() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [sealedWarningProduct, setSealedWarningProduct] = useState(null);

  const activeData = categories.find(
    (category) => category.id === activeCategory
  );

  const activeProducts = sortProducts(
    categoryProducts.filter(
      (product) => product.category === activeCategory
    ),
    sortOrder
  );

  const handleCategoryClick = (categoryId) => {
    setActiveCategory((current) =>
      current === categoryId ? null : categoryId
    );
  };

  const handleProductClick = (product) => {
    if (product.category === "sealed") {
      setSealedWarningProduct(product);
      return;
    }
    navigate(`/product/${product.id}`);
  };

  const handleSealedConfirm = () => {
    if (sealedWarningProduct) {
      navigate(`/product/${sealedWarningProduct.id}`);
    }
    setSealedWarningProduct(null);
  };

  const handleSealedCancel = () => {
    setSealedWarningProduct(null);
  };

  const categoryKeywords = {
    mind: "마음",
    relation: "관계",
    curse: "저주 위험",
    sealed: "봉인",
    night: "오늘 밤",
  };

  const trimmedQuery = searchQuery.trim().toLowerCase();

  const searchResults = trimmedQuery
    ? categoryProducts.filter((product) => {
        const haystack = [
          product.name,
          product.nameEn,
          product.tagline,
          product.effect,
          product.warning,
          product.descriptionLong,
          product.texture,
          categoryKeywords[product.category],
          Array.isArray(product.taste)
            ? product.taste.join(" ")
            : "",
          Array.isArray(product.ingredients)
            ? product.ingredients.join(" ")
            : "",
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return haystack.includes(trimmedQuery);
      })
    : [];

  const sortedSearchResults = sortProducts(searchResults, sortOrder);

  return (
    <section className="shelf-section" id="shelf">
      <div className="shelf-inner">

        <header className="shelf-header">
          <p className="shelf-eyebrow">
            WIZARD'S GUIDE
          </p>

          <h2 className="shelf-title">
            어떤 효과를 찾으세요?
          </h2>

          <p className="shelf-subtitle">
            원하는 효과를 선택하면 진열대가 열립니다.
          </p>

          <div className="shelf-search">
            <span className="shelf-search-icon">✦</span>

            <input
              type="text"
              className="shelf-search-input"
              placeholder="원하는 효과로 찾기 (예: 불안, 기억, 관계, 저주…)"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
            />

            {searchQuery && (
              <button
                type="button"
                className="shelf-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="검색어 지우기"
              >
                ×
              </button>
            )}
          </div>

          {!searchQuery && (
            <div className="shelf-search-suggestions">
              <span className="shelf-search-suggestions-label">
                인기로 찾는 효과
              </span>

              {popularSearchTerms.map((term) => (
                <button
                  key={term}
                  type="button"
                  className="shelf-search-chip"
                  onClick={() => setSearchQuery(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </header>

        {trimmedQuery ? (
          <div className="shelf-search-results">
            <div className="shelf-search-results-head">
              <p className="shelf-search-results-label">
                "{searchQuery}" 검색 결과 {searchResults.length}건
              </p>

              {searchResults.length > 0 && (
                <select
                  className="shelf-sort-select"
                  value={sortOrder}
                  onChange={(event) =>
                    setSortOrder(event.target.value)
                  }
                  aria-label="정렬 방식"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {searchResults.length === 0 ? (
              <p className="shelf-search-empty">
                해당하는 효과의 품목을 찾지 못했습니다.
              </p>
            ) : (
              <div className="category-product-grid">
                {sortedSearchResults.map((product) => {
                  const statusClass = product.status
                    .toLowerCase()
                    .replaceAll(" ", "-");

                  return (
                    <button
                      key={product.id}
                      type="button"
                      className={`category-product-card ${product.category === "sealed" ? "category-product-card--sealed" : ""}`}
                      onClick={() =>
                        handleProductClick(product)
                      }
                    >
                      <div className="category-product-image">

                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                          />
                        ) : (
                          <div
                            className={`category-product-placeholder placeholder-${product.category}`}
                          >
                            <span>
                              {product.nameEn}
                            </span>

                            <small>
                              IMAGE IN PREPARATION
                            </small>
                          </div>
                        )}

                        {product.status !== "AVAILABLE" && (
                          <span
                            className={`category-status status-${statusClass}`}
                          >
                            {product.status}
                          </span>
                        )}

                        {product.category === "sealed" && (
                          <span
                            className="sealed-wax-seal"
                            aria-hidden="true"
                          >
                            ✦
                          </span>
                        )}

                      </div>

                      <div className="category-product-info">

                        <p>
                          {product.nameEn}
                        </p>

                        <div className="category-product-name-row">
                          <h4>
                            {product.name}
                          </h4>

                          <span>
                            {product.price}
                          </span>
                        </div>

                        <p className="category-product-tagline">
                          {product.tagline}
                        </p>

                        <div className="category-product-more">
                          <span>
                            효과 보기
                          </span>

                          <span>
                            →
                          </span>
                        </div>

                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <>
        <div className="shelf-panels">
          {categories.map((category) => {
            const active =
              activeCategory === category.id;

            const handleFrostMove = (event) => {
              const rect =
                event.currentTarget.getBoundingClientRect();

              const x =
                ((event.clientX - rect.left) / rect.width) * 100;
              const y =
                ((event.clientY - rect.top) / rect.height) * 100;

              event.currentTarget.style.setProperty(
                "--frost-x",
                `${x}%`
              );
              event.currentTarget.style.setProperty(
                "--frost-y",
                `${y}%`
              );
            };

            const handleFrostLeave = (event) => {
              event.currentTarget.style.setProperty(
                "--frost-x",
                "-999px"
              );
              event.currentTarget.style.setProperty(
                "--frost-y",
                "-999px"
              );
            };

            return (
              <button
                key={category.id}
                type="button"
                className={`shelf-category ${
                  active ? "is-active" : ""
                }`}
                onClick={() =>
                  handleCategoryClick(category.id)
                }
                onMouseMove={handleFrostMove}
                onMouseLeave={handleFrostLeave}
                aria-pressed={active}
              >
                <span
                  className="shelf-frost"
                  aria-hidden="true"
                />

                <span className="shelf-big-number">
                  {category.number}
                </span>

                <div className="shelf-category-top">
                  <span>
                    {category.number}
                  </span>

                  <div className="shelf-category-icon">
                    {category.icon}
                  </div>
                </div>

                <div className="shelf-category-bottom">
                  <p>{category.label}</p>
                  <h3>{category.title}</h3>
                </div>
              </button>
            );
          })}
        </div>

        <div
          className={`category-showcase ${
            activeCategory ? "is-visible" : ""
          }`}
        >
          {activeData && (
            <div className="category-showcase-inner">

              <div className="category-showcase-heading">
                <div>
                  <p className="category-showcase-label">
                    {activeData.label} COLLECTION
                  </p>

                  <h3>
                    {activeData.title}
                  </h3>

                  <p className="category-showcase-description">
                    {activeData.description}
                  </p>
                </div>

                <div className="category-heading-right">
                  <span className="category-count">
                    {String(
                      activeProducts.length
                    ).padStart(2, "0")}{" "}
                    ITEMS
                  </span>

                  <select
                    className="shelf-sort-select"
                    value={sortOrder}
                    onChange={(event) =>
                      setSortOrder(event.target.value)
                    }
                    aria-label="정렬 방식"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="category-product-grid">
                {activeProducts.map((product) => {
                  const statusClass = product.status
                    .toLowerCase()
                    .replaceAll(" ", "-");

                  return (
                    <button
                      key={product.id}
                      type="button"
                      className={`category-product-card ${product.category === "sealed" ? "category-product-card--sealed" : ""}`}
                      onClick={() =>
                        handleProductClick(product)
                      }
                    >
                      <div className="category-product-image">

                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                          />
                        ) : (
                          <div
                            className={`category-product-placeholder placeholder-${product.category}`}
                          >
                            <span>
                              {product.nameEn}
                            </span>

                            <small>
                              IMAGE IN PREPARATION
                            </small>
                          </div>
                        )}

                        {product.status !== "AVAILABLE" && (
                          <span
                            className={`category-status status-${statusClass}`}
                          >
                            {product.status}
                          </span>
                        )}

                        {product.category === "sealed" && (
                          <span
                            className="sealed-wax-seal"
                            aria-hidden="true"
                          >
                            ✦
                          </span>
                        )}

                      </div>

                      <div className="category-product-info">

                        <p>
                          {product.nameEn}
                        </p>

                        <div className="category-product-name-row">
                          <h4>
                            {product.name}
                          </h4>

                          <span>
                            {product.price}
                          </span>
                        </div>

                        <p className="category-product-tagline">
                          {product.tagline}
                        </p>

                        <div className="category-product-more">
                          <span>
                            효과 보기
                          </span>

                          <span>
                            →
                          </span>
                        </div>

                      </div>
                    </button>
                  );
                })}
              </div>

            </div>
          )}
        </div>
          </>
        )}

      </div>

      {sealedWarningProduct && (
        <div
          className="sealed-warning-overlay"
          role="dialog"
          aria-modal="true"
          onClick={handleSealedCancel}
        >
          <div
            className="sealed-warning-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="sealed-warning-icon" aria-hidden="true">
              ✦
            </span>

            <p className="sealed-warning-eyebrow">
              SEALED ITEM
            </p>

            <h3 className="sealed-warning-title">
              이 품목은 열람이 제한되어 있습니다
            </h3>

            <p className="sealed-warning-body">
              {sealedWarningProduct.name}은(는) 일반 진열대에 놓이지 않는
              품목입니다. 점장의 판단 없이 열람한 기록은 남지 않습니다.
              그래도 확인하시겠습니까?
            </p>

            <div className="sealed-warning-actions">
              <button
                type="button"
                className="sealed-warning-cancel"
                onClick={handleSealedCancel}
              >
                돌아가기
              </button>

              <button
                type="button"
                className="sealed-warning-confirm"
                onClick={handleSealedConfirm}
              >
                그래도 확인한다
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

export default Shelf;