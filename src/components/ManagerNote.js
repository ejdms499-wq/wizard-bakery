import "../css/ManagerNote.css";

function ManagerNote() {
  return (
    <section className="manager-note-section">
      <div className="manager-note-inner">
        <p className="manager-note-label">MANAGER'S NOTE</p>

        <h2 className="manager-note-quote">
          주문 전 주의사항을 확인하세요.
          <br />
          효과가 시작된 뒤에는 되돌릴 수 없습니다.
        </h2>

        <div className="manager-note-sign">
          <span className="manager-note-line"></span>
          <span className="manager-note-name">점장</span>
        </div>
      </div>
    </section>
  );
}

export default ManagerNote;