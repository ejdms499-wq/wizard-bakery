import React, { useState, useEffect } from "react";
import "../css/ContractToast.css";
import categoryProducts from "../db/categoryProducts.json";

const surnames = ["김", "이", "박", "최", "정", "강", "조", "윤"];

function getRandomMaskedName() {
  const surname =
    surnames[Math.floor(Math.random() * surnames.length)];
  return `${surname}**님`;
}

function getRandomProductName() {
  const product =
    categoryProducts[
      Math.floor(Math.random() * categoryProducts.length)
    ];
  return product.name;
}

function ContractToast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let hideTimer;

    const showToast = () => {
      setToast({
        name: getRandomMaskedName(),
        product: getRandomProductName(),
      });

      hideTimer = setTimeout(() => {
        setToast(null);
      }, 4500);
    };

    const scheduleNext = () => {
      const delay = 18000 + Math.random() * 22000;
      return setTimeout(() => {
        showToast();
        intervalId = scheduleNext();
      }, delay);
    };

    let intervalId = scheduleNext();

    return () => {
      clearTimeout(intervalId);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!toast) {
    return null;
  }

  return (
    <div className="contract-toast">
      <span className="contract-toast-dot"></span>

      <p>
        방금 {toast.name}이 「{toast.product}」에 서명했습니다.
      </p>
    </div>
  );
}

export default ContractToast;