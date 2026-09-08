import React from "react";
import "../css/GlobalFog.css";

function GlobalFog() {
  return (
    <div className="global-fog" aria-hidden="true">
      <span className="global-fog-blob global-fog-blob-1"></span>
      <span className="global-fog-blob global-fog-blob-2"></span>
      <span className="global-fog-blob global-fog-blob-3"></span>
    </div>
  );
}

export default GlobalFog;