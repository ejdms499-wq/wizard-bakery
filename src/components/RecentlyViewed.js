import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/RecentlyViewed.css";
import categoryProducts from "../db/categoryProducts.json";
import { getRecentlyViewed } from "../utils/recentlyViewed";

function RecentlyViewed({ excludeId }) {
  const [recentIds, setRecentIds] = useState([]);

  useEffect(() => {
    setRecentIds(getRecentlyViewed());
  }, [excludeId]);

  const products = recentIds
    .filter((id) => id !== excludeId)
    .map((id) => categoryProducts.find((item) => item.id === id))
    .filter(Boolean);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="recently-viewed">
      <div className="recently-viewed-inner">

        <p className="recently-viewed-label">
          최근에 손이 닿았던 것들
        </p>

        <div className="recently-viewed-strip">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="recently-viewed-card"
            >
              <div className="recently-viewed-image">
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <div className="recently-viewed-placeholder">
                    <span>{product.nameEn}</span>
                  </div>
                )}
              </div>

              <p className="recently-viewed-name">
                {product.name}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default RecentlyViewed;