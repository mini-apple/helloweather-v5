import React from "react";

function ExplainTemperature() {
  return (
    <ul className="criteria-ul">
      <li>기온의 단위는 °C를 사용합니다.</li>
      <li>점수는 예보값과 실황값의 기온 차이에 따라 계산합니다.</li>
      <li>
        차이에 따라서 1°C 이하(10점), 2°C 이하(8점), 3°C 이하(6점), 4°C
        이하(4점), 5°C 이하(2점), 그 이상(0점) 을 부여합니다.
      </li>
    </ul>
  );
}

export default ExplainTemperature;
