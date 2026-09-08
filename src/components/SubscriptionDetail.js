import React, { useState, useEffect } from "react";
import "../css/SubscriptionDetail.css";
import {
  getSubscription,
  subscribe,
  unsubscribe,
  getNextAssignmentMonthLabel,
} from "../utils/subscription";

function SubscriptionDetail() {
  const [subscription, setSubscription] = useState(null);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSubscription(getSubscription());
  }, []);

  const handleSubscribe = () => {
    if (!name.trim() || isSubmitting) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const data = subscribe(name.trim());
      setSubscription(data);
      setIsSubmitting(false);
    }, 1200);
  };

  const handleUnsubscribe = () => {
    unsubscribe();
    setSubscription(null);
    setName("");
  };

  return (
    <section className="subscription-detail">
      <div className="subscription-detail-inner">

        <header className="subscription-detail-head">
          <p className="subscription-detail-eyebrow">
            MONTHLY CONTRACT
          </p>

          <h1 className="subscription-detail-title">
            정기 계약
          </h1>

          <p className="subscription-detail-intro">
            매달 하루, 무엇이 올지 모르는 품목 하나가 배정됩니다.
            <br />
            어떤 것이 올지는 점장도, 손님도 미리 알 수 없습니다.
          </p>
        </header>

        <div className="subscription-detail-body">

          {subscription ? (
            <div className="subscription-status">
              <p className="subscription-status-label">
                계약 유지 중
              </p>

              <p className="subscription-status-text">
                {subscription.name}님과의 정기 계약이
                이어지고 있습니다.
              </p>

              <p className="subscription-status-next">
                다음 배정: {getNextAssignmentMonthLabel()} 자정
              </p>

              <button
                type="button"
                className="subscription-unsubscribe"
                onClick={handleUnsubscribe}
              >
                계약 해지하기
              </button>
            </div>
          ) : (
            <div className="subscription-form">
              <p className="subscription-form-note">
                계약을 맺으면 매달 자정, 정체를 알 수 없는
                품목 하나가 배정됩니다. 실제로 무언가
                도착하지는 않지만, 기록은 남습니다.
              </p>

              <input
                type="text"
                className="subscription-name-input"
                placeholder="계약서에 남길 이름을 적어주세요"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={isSubmitting}
              />

              <button
                type="button"
                className="subscription-submit"
                onClick={handleSubscribe}
                disabled={!name.trim() || isSubmitting}
              >
                {isSubmitting
                  ? "계약을 맺는 중…"
                  : "정기 계약을 맺습니다"}
              </button>
            </div>
          )}

        </div>

        <div className="subscription-detail-rules">
          <p className="subscription-detail-rules-label">
            정기 계약의 조건
          </p>

          <ul>
            <li>배정되는 품목은 매달 다르며, 선택할 수 없습니다.</li>
            <li>계약은 언제든 해지할 수 있습니다.</li>
            <li>해지 후 다시 계약하면, 이전 기록은 남지 않습니다.</li>
          </ul>
        </div>

      </div>
    </section>
  );
}

export default SubscriptionDetail;