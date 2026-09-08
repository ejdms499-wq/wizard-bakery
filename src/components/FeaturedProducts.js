import React from "react";
import { Link } from "react-router-dom";
import "../css/FeaturedProducts.css";
import categoryProducts from "../db/categoryProducts.json";

function FeaturedProducts() {
  const products = categoryProducts.filter(
    (item) => item.category === "night"
  );

  const typeLabels = {
    501: "CURSE",
    502: "RELATION",
    503: "MIND",
    504: "SEALED",
  };

  return (
    <section className="featured-products" id="featured">
      <div className="featured-products-inner">

        <div className="featured-products-header">
          <div>
            <p className="featured-products-eyebrow">
              TONIGHT'S SELECTION
            </p>

            <h2>오늘 밤의 진열</h2>
          </div>

          <p className="featured-products-intro">
            오늘 밤, 네 가지 효과가 준비되어 있습니다.
            <br />
            효과와 대가는 상품마다 다릅니다.
          </p>
        </div>

        <div className="featured-products-grid">
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              className="featured-product"
              key={product.id}
            >

              <div className="featured-product-image">
                <img
                  src={product.image}
                  alt={product.name}
                />

                <span className="featured-product-type">
                  {typeLabels[product.id]}
                </span>
              </div>

              <div className="featured-product-text">
                <p className="featured-product-en">
                  {product.nameEn}
                </p>

                <div className="featured-product-title-row">
                  <h3>{product.name}</h3>
                  <span>{product.price}</span>
                </div>

                <p className="featured-product-desc">
                  {product.tagline}
                </p>

                <span className="featured-product-more">
                  <span>상품 보기</span>
                  <span>→</span>
                </span>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;