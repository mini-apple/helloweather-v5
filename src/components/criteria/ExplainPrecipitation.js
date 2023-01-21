import React from "react";

function ExplainPrecipitation() {
  return (
    <ul>
      <li>강수량의 단위는 mm를 사용합니다.</li>
      <li>
        강수량은 당일 0시부터 예보시각까지의 누적값으로 상정합니다. (ex:
        0시~15시)
      </li>
      <li>
        채점을 할 때는 예보값과 실황값의 강수량 구간 차이로 점수를 계산합니다.
      </li>
      <li>
        예보값과 실황값의 강수량 구간 차이에 따라서 0(10점), 1(7점), 2(4점),
        3(1점), 그 이상(0점)을 부여합니다.
      </li>
    </ul>
  );
}

export default ExplainPrecipitation;
