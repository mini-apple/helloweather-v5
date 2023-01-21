import React from "react";

function ExplainWindSpeed() {
  return (
    <ul>
      <li>풍속의 단위는 m/s를 사용합니다.</li>
      <li>
        채점을 할 때는 예보값과 실황값의 풍속 구간 차이로 점수를 계산합니다.
      </li>
      <li>
        예보값과 실황값의 풍속 구간 차이에 따라서 0(10점), 1(7점), 2(4점),
        3(1점), 그 이상(0점)을 부여합니다.
      </li>
    </ul>
  );
}

export default ExplainWindSpeed;
