import React from "react";

function ExplainWindDirection() {
  return (
    <ul className="criteria-ul">
      <li>풍향은 북점을 기준으로하는 16방위각을 사용합니다.</li>
      <li>점수는 예보값과 실황값의 각도 차이에 따라 계산합니다.</li>
      <li>
        차이에 따라 0°(10점), 22.5°(8점), 45°(6점), 67.5°(4점), 90°(2점), 그
        이상(0점) 을 부여합니다.
      </li>
    </ul>
  );
}

export default ExplainWindDirection;
