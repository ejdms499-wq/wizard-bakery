import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/WishList.css";
import categoryProducts from "../db/categoryProducts.json";
import { getWishes, toggleWish } from "../utils/wishes";

function WishList() {
  const [wishedIds, setWishedIds] = useState([]);

  useEffect(() => {
    setWishedIds(getWishes());
  }, []);

  const wishedProducts = categoryProducts.filter((item) =>
    wishedIds.includes(item.id)
  );

  const handleRemove = (id) => {
    const next = toggleWish(id);
    setWishedIds(next);
  };

  return (
    <section className="wish-list">
      <div className="wish-list-inner">

        <header className="wish-list-head">
          <p className="wish-list-eyebrow">
            MARKED WISHES
          </p>

          <h1 className="wish-list-title">
            마음에 새겨둔 것들
          </h1>

          <p className="wish-list-intro">
            아직 주문하지 않은, 마음에만 새겨둔 품목입니다.
          </p>
        </header>

        {wishedProducts.length === 0 ? (
          <div className="wish-list-empty">
            <p>아직 새겨둔 것이 없습니다.</p>

            <Link to="/" className="wish-list-empty-link">
              진열대 둘러보기 →
            </Link>
          </div>
        ) : (
          <div className="wish-list-grid">
            {wishedProducts.map((product) => (
              <div className="wish-list-card" key={product.id}>

                <Link
                  to={`/product/${product.id}`}
                  className="wish-list-card-image"
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  ) : (
                    <div className="wish-list-card-placeholder">
                      <span>{product.nameEn}</span>
                    </div>
                  )}
                </Link>

                <div className="wish-list-card-text">
                  <Link to={`/product/${product.id}`}>
                    <p className="wish-list-card-en">
                      {product.nameEn}
                    </p>

                    <h3>{product.name}</h3>
                  </Link>

                  <div className="wish-list-card-bottom">
                    <span>{product.price}</span>

                    <button
                      type="button"
                      onClick={() => handleRemove(product.id)}
                    >
                      새김 지우기
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default WishList;