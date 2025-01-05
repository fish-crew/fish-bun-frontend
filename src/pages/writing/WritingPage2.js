import React from 'react';
import { useNavigate } from "react-router-dom";

const WritingPage2 = () => {
  const navigate = useNavigate();
  const moveToNextPage = () => {
    navigate("/writingPage3");
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div class="article"
        style={{
          flex: 1, // 남은 공간을 모두 차지
          overflowY: 'auto', // 세로 스크롤 활성화
          padding: '20px',
        }}>
        <h1>붕어빵 기계의 작동 원리와 구매 가이드</h1>
        <p>
          붕어빵은 한국 겨울철을 대표하는 길거리 간식으로, 달콤하고 따뜻한 맛으로 많은 사람들에게 사랑받고 있습니다. 이 붕어빵을 만들기 위해 꼭 필요한 도구가 바로 <strong>붕어빵 기계</strong>입니다. 겉으로 보기엔 간단해 보이지만, 붕어빵 기계는 효율성과 품질을 좌우하는 중요한 장비입니다. 이번 글에서는 붕어빵 기계의 작동 원리와 구매 시 고려해야 할 요소들에 대해 자세히 알아보겠습니다.
        </p>

        <section>
          <h2>1. 붕어빵 기계의 기본 구조와 작동 원리</h2>
          <h3>(1) 기본 구조</h3>
          <p>
            붕어빵 기계는 크게 <strong>본체</strong>와 <strong>붕어빵 틀</strong>로 구성됩니다.
          </p>
          <ul>
            <li><strong>본체</strong>: 기계의 하단부로 열을 전달하는 역할을 합니다. 가스 버너나 전기 히터 방식으로 열을 공급합니다.</li>
            <li><strong>붕어빵 틀</strong>: 반죽과 속재료를 넣는 틀로, 붕어 모양을 형성하는 가장 중요한 부분입니다. 알루미늄이나 주철로 제작되며, 재질에 따라 열전도율과 내구성이 달라집니다.</li>
          </ul>

          <h3>(2) 작동 원리</h3>
          <ol>
            <li><strong>열 공급</strong>: 가스 또는 전기를 사용하여 기계에 열을 전달합니다.</li>
            <li><strong>반죽 투입</strong>: 예열된 붕어빵 틀에 반죽을 얇게 펴고 속재료(팥, 크림 등)를 넣은 뒤 다시 반죽으로 덮습니다.</li>
            <li><strong>틀 닫기</strong>: 붕어빵 틀을 닫아 반죽이 붕어 모양으로 고정되도록 압력을 가합니다.</li>
            <li><strong>뒤집기</strong>: 일정 시간이 지나면 틀을 뒤집어 반대쪽도 고르게 익도록 합니다.</li>
            <li><strong>완성</strong>: 일정 시간 조리한 뒤 틀을 열고 완성된 붕어빵을 꺼냅니다.</li>
          </ol>
        </section>

        <section>
          <h2>2. 붕어빵 기계의 유형</h2>
          <h3>(1) 열원 방식에 따른 구분</h3>
          <ul>
            <li>
              <strong>가스식 붕어빵 기계</strong>:
              - <strong>장점</strong>: 예열 속도가 빠르고 강한 화력을 제공합니다.<br />
              - <strong>단점</strong>: 실외에서 사용 시 바람의 영향을 받을 수 있으며, 가스 안전 관리가 필요합니다.
            </li>
            <li>
              <strong>전기식 붕어빵 기계</strong>:
              - <strong>장점</strong>: 온도 조절이 용이하며, 실내에서도 안전하게 사용할 수 있습니다.<br />
              - <strong>단점</strong>: 초기 예열 시간이 길고 전기 요금이 추가로 발생합니다.
            </li>
          </ul>

          <h3>(2) 틀의 크기와 모양</h3>
          <p>
            붕어빵 틀은 한 번에 조리할 수 있는 개수와 모양에 따라 다양합니다.
          </p>
          <ul>
            <li><strong>소형 기계</strong>: 가정용으로 적합하며, 한 번에 2~4개의 붕어빵을 만들 수 있습니다.</li>
            <li><strong>대형 기계</strong>: 상업용으로 사용되며, 한 번에 10개 이상의 붕어빵을 생산할 수 있습니다.</li>
          </ul>
          <p>
            최근에는 전통적인 붕어 모양 외에도 다양한 모양(별, 하트 등)의 틀이 출시되어 고객의 관심을 끌고 있습니다.
          </p>
        </section>

        <section>
          <h2>3. 구매 가이드: 어떤 붕어빵 기계를 선택할까?</h2>
          <h3>(1) 용도에 따른 선택</h3>
          <ul>
            <li><strong>가정용</strong>: 간단한 조리와 소량의 붕어빵 제작을 위해 전기식 소형 기계를 추천합니다. 조작이 간편하고 유지보수가 적습니다.</li>
            <li><strong>상업용</strong>: 하루에 수백 개의 붕어빵을 생산해야 한다면 가스식 대형 기계가 적합합니다. 생산성과 내구성이 중요하기 때문입니다.</li>
          </ul>

          <h3>(2) 주요 고려사항</h3>
          <ul>
            <li><strong>재질</strong>: 주철 소재는 내구성이 뛰어나고 열 보존력이 우수하지만 무겁습니다. 알루미늄 소재는 가볍고 열전도가 빠르지만 내구성은 다소 떨어집니다.</li>
            <li><strong>열원</strong>: 야외에서 운영할 경우 가스식을, 실내에서는 전기식을 선택하는 것이 유리합니다.</li>
            <li><strong>청소와 유지보수</strong>: 틀을 쉽게 분리할 수 있는 구조인지 확인하고, 코팅 처리된 틀을 선택하면 청소가 간편합니다.</li>
            <li><strong>가격대</strong>: 가정용 소형 기계는 5만 원~10만 원대, 상업용 대형 기계는 50만 원 이상입니다.</li>
            <li><strong>브랜드와 A/S</strong>: 검증된 제조사의 제품을 선택하고, A/S 지원 여부를 확인하세요.</li>
          </ul>
        </section>

        <section>
          <h2>4. 붕어빵 기계 활용 팁</h2>
          <ul>
            <li><strong>기계 예열</strong>: 반죽을 붓기 전에 틀을 충분히 예열하세요. 적절한 온도는 180~200℃로 유지하면 붕어빵이 고르게 익고 바삭한 식감을 얻을 수 있습니다.</li>
            <li><strong>반죽과 속재료 배합</strong>: 반죽의 점도를 조절하여 틀에 잘 붙도록 하고, 속재료는 적당량만 넣어 넘치지 않도록 주의합니다.</li>
            <li><strong>청소와 관리</strong>: 조리가 끝난 뒤 틀에 붙은 잔여물을 제거하고 기계를 완전히 식힌 후 청소하세요. 정기적으로 틀의 코팅 상태를 점검하고, 손상이 있을 경우 교체를 고려하세요.</li>
          </ul>
        </section>

        <section>
          <h2>5. 결론</h2>
          <p>
            붕어빵 기계는 단순한 조리 도구를 넘어, 붕어빵의 품질과 생산성을 좌우하는 핵심 장비입니다. 기계를 선택할 때는 사용 용도, 열원 방식, 틀 재질, 청소 용이성 등을 신중히 고려해야 합니다. 적합한 기계를 선택하고 올바르게 관리한다면, 가정에서도 또는 사업장에서 맛있는 붕어빵을 지속적으로 제공할 수 있을 것입니다. 이번 겨울, 자신만의 붕어빵 기계를 선택해 따뜻하고 달콤한 붕어빵을 만들어 보세요!
          </p>
        </section>
      </div>

      {/* 버튼 영역 */}
      <button
        style={{
          position: 'sticky',
          bottom: '10px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          alignSelf: 'flex-end',
        }}
        onClick={moveToNextPage}
      >
        다음
      </button>
    </div>
  );
};

export default WritingPage2;
