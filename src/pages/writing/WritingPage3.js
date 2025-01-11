import React from "react";
import { useNavigate } from "react-router-dom";

const WritingPage = () => {
  const navigate = useNavigate();
  const moveToNextPage = () => {
    navigate("/loginPage");
  };
  const handleClose = () => navigate("/tutorialPage");

  return (
    <div className="flex flex-col justify-start h-full relative">
      <div className="w-full h-max">
        <img src="/assets/webp/paperOnCheckT.webp" alt="상단 배너" />
      </div>
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-[#650000] hover:bg-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-white stroke-[3px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div
        className="w-full flex flex-col flex-grow bg-cover bg-repeat-y items-center overflow-y-hidden"
        style={{ backgroundImage: "url('/assets/webp/paperOnCheckB.webp')" }}
      >
        <div className="text-point-color text-sz35 py-4 px-5 font-semibold text-start w-full">
          붕어빵의 역사와 기원
        </div>

        <div className="flex flex-col px-5 flex-grow justify-start w-full overflow-y-auto text-start break-all">
          <p>
            붕어빵은 겨울철 한국 길거리에서 흔히 볼 수 있는 대표적인 간식입니다.
            그 달콤하고 따뜻한 맛은 어린아이부터 어른들까지 모두의 입맛을
            사로잡습니다. 하지만 이 친숙한 간식이 어디에서 유래했는지에 대해서는
            많은 사람들이 잘 알지 못합니다. 이번 글에서는 붕어빵의 기원과 역사,
            그리고 한국에서 어떻게 자리 잡았는지에 대해 알아보겠습니다.
          </p>

          <section>
            <div className="text-sz30 pt-5 pb-1">
              1. 붕어빵의 기원: 일본 타이야키에서 출발
            </div>
            <p>
              붕어빵의 기원은 일본의 전통 간식인{" "}
              <strong>타이야키(たい焼き)</strong>로 거슬러 올라갑니다.
              타이야키는 1900년대 초 일본에서 처음 만들어졌으며, 원래는 밀가루
              반죽에 팥소를 넣고 <strong>도미(타이)</strong> 모양의 틀에서
              구워낸 간식이었습니다. 일본에서는 도미가 부와 행운을 상징하는
              물고기로 여겨져, 도미 모양의 간식이 큰 인기를 끌었습니다.
            </p>
            <p>
              타이야키의 성공은 일본 전역으로 퍼졌고, 이후 1930년대에 한국으로
              전파되었습니다. 당시 한국은 일제강점기 시대로, 일본 문화와 음식이
              자연스럽게 유입되었으며, 타이야키 역시 이 시기에 한국에
              소개되었습니다. 하지만 일본의 타이야키가 도미 모양을 유지한 데
              반해, 한국에서는 붕어라는 친근한 민물고기 모양으로 변형되었습니다.
            </p>
          </section>

          <section>
            <div className="text-sz30 pt-5 pb-1">2. 붕어빵의 한국화 과정</div>
            <p>
              붕어빵이 한국에서 정착하게 된 데에는 몇 가지 요인이 있습니다.
              첫째, <strong>붕어</strong>는 한국에서 친숙하고 대중적인
              물고기였기 때문에 한국인의 정서에 잘 맞았습니다. 또한, 붕어는
              도미에 비해 더 단순하고 귀여운 모양으로 대중적인 호감을 얻기
              쉬웠습니다.
            </p>
            <p>
              둘째, 타이야키가 고급 간식으로 여겨졌던 일본과 달리, 붕어빵은{" "}
              <strong>저렴한 가격</strong>과 간단한 재료로 누구나 쉽게 즐길 수
              있는 간식으로 자리 잡았습니다. 밀가루와 설탕, 팥소만 있으면 쉽게
              만들 수 있었고, 이는 경제적으로 어려웠던 시절에도 큰 인기를 끌게
              했습니다.
            </p>
            <p>
              1970년대부터 본격적으로 길거리 노점에서 붕어빵이 판매되기
              시작했으며, 겨울철 대표 간식으로 자리 잡았습니다. 특히 당시 한국의
              겨울은 길고 추웠는데, 따뜻한 붕어빵은 추위를 잊게 하는 저렴한
              즐거움이 되었습니다.
            </p>
          </section>

          <section>
            <div className="text-sz30 pt-5 pb-1">3. 현대 붕어빵의 다양화</div>
            <p>
              전통적인 팥소 붕어빵 외에도 현대에 들어 다양한 변형된 붕어빵이
              등장했습니다. 초콜릿, 커스터드 크림, 고구마, 피자 토핑까지 다양한
              속재료를 활용한 붕어빵이 출시되며, 소비자의 선택의 폭을
              넓혔습니다.
            </p>
            <p>
              또한, 크기와 형태에서도 변화가 생겼습니다. 작은 미니 붕어빵은 한
              입 크기로 간편하게 즐길 수 있어 인기를 끌고 있으며, 대형 붕어빵은
              특유의 먹는 재미로 젊은 층에게 어필하고 있습니다. 최근에는
              아이스크림 붕어빵, 바삭한 붕어빵 과자 등 새로운 형태로도 발전하고
              있습니다.
            </p>
          </section>

          <section>
            <div className="text-sz30 pt-5 pb-1">4. 붕어빵의 문화적 상징</div>
            <p>
              붕어빵은 단순한 간식을 넘어, <strong>겨울철의 상징</strong>이자
              사람들에게 따뜻한 추억을 떠올리게 하는 음식으로 자리 잡았습니다.
              특히 길거리 노점에서 갓 구워낸 붕어빵은 현대인에게도 어린 시절의
              향수를 불러일으킵니다.
            </p>
            <p>
              또한, "붕어빵 같다"라는 표현은{" "}
              <strong>부모와 자녀가 닮았다</strong>는 의미로 사용될 정도로
              한국인의 일상 속에 깊이 스며들어 있습니다. 이는 붕어빵이 한국
              대중문화에서 어떤 위치를 차지하고 있는지를 보여줍니다.
            </p>
          </section>

          <section>
            <p>
              붕어빵은 일본의 타이야키에서 유래했지만, 한국에서 독자적으로
              변형되어 <strong>겨울철 대표 간식</strong>으로 자리 잡았습니다.
              붕어라는 친근한 모양, 간단한 재료와 조리법, 저렴한 가격 덕분에
              남녀노소 모두에게 사랑받고 있습니다. 또한, 현대에 들어 다양한 맛과
              형태로 발전하며 여전히 대중들에게 즐거움을 선사하고 있습니다. 이번
              겨울, 길거리에서 붕어빵 한 입으로 따뜻한 추억을 만들어 보세요!
            </p>
          </section>
        </div>
        <button
          className="my-4 bg-[#630000] hover:bg-white hover:text-[#630000] text-white border-4 font-bold py-2 px-6 rounded-full w-72 text-sz35 tracking-[.25em] h-[8dvh]"
          onClick={moveToNextPage}
        >
          탐험 떠나기
        </button>
      </div>
    </div>
  );
};

export default WritingPage;
