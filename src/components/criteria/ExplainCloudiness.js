import React from "react";

function ExplainCloudiness() {
  return (
    <ul>
      <li>운량은 0부터 10까지 11계급을 사용합니다.</li>
      <li>채점을 할 때는 예보값과 실황값의 차이로 점수를 계산합니다.</li>
      <li>
        예보값과 실황값의 차이에 따라 0(10점), 1(8점), 2(6점), 3(4점), 4(2점),
        그 이상(0점) 을 부여합니다.
      </li>
    </ul>
  );
}

export default ExplainCloudiness;
