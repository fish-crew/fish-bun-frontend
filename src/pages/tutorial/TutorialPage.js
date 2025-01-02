import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

function TextBlock({ text, ref, lineCount }) {
  return (
    <div className="relative w-full text-sz25 text-start leading-[1.8rem] px-2">
      <p ref={ref} className="relative z-10 break-all">
        {text.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      <div className="absolute top-[3.4rem] left-0 w-full pointer-events-none z-0">
        {Array.from({ length: lineCount }, (_, index) => (
          <img
            key={`line-${index}`}
            src="/assets/webp/diaryLine.webp"
            alt="diaryLine"
            className="w-full h-[0.2rem]"
            style={{ position: "absolute", top: `${index * 1.9}rem` }}
          />
        ))}
      </div>
    </div>
  );
}

function TutorialPage() {
  const navigate = useNavigate();
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const [lineCount1, setLineCount1] = useState(0);
  const [lineCount2, setLineCount2] = useState(0);

  const handleClose = () => navigate("/loadingPage");
  const moveToLogin = () => navigate("/loginPage");

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
          붕어빵 탐험대원 활동 지침서
        </div>

        <div className="flex flex-col px-5 flex-grow justify-start w-full overflow-y-auto text-start break-all">
          <div className="bg-[#630000] text-white w-fit px-2 py-1 rounded-lg">
            로딩 페이지
          </div>
          <div className="pt-1 pb-6">
            팥냥이와 함께 떠나는 붕어빵 탐험! 팥냥이가 탐험대원분들을 안내해
            줍니다.
          </div>
          <div className="bg-[#630000] text-white w-fit px-2 py-1 rounded-lg">
            로그인 페이지
          </div>
          <div className="pt-1 pb-6">
            <span>
              본격적인 탐험을 떠나기 위해서는 탐험대원 여러분의 신원 확인이
              필요합니다. 노란색&nbsp;
            </span>
            <img
              src="/assets/webp/kakao_login_medium_narrow.webp"
              alt="카카오 로그인 버튼"
              className="h-[3.5vh] align-middle inline"
            />
            <span>&nbsp;버튼을 클릭해 로그인을 진행해 주세요.</span>
          </div>

          <div className="bg-[#630000] text-white w-fit px-2 py-1 rounded-lg">
            닉네임 설정 페이지
          </div>
          <div className="pt-1 pb-6">
            붕어빵 탐험에서 사용할 닉네임을 설정해 주세요! 공백 포함 최대
            7글자까지 설정 가능합니다. 원하는 이름을 입력했다면 확인 버튼을
            눌러주세요.
          </div>
          <div className="bg-[#630000] text-white w-fit px-2 py-1 rounded-lg">
            메인 페이지
          </div>
          <div className="pt-1 pb-6">
            <p className="text-bold text-point-color font-bold">
              ◆ 붕어빵 등록하기
            </p>
            붕어빵 탐험대에 합류하게 되신 걸 환영합니다! 메인 화면에서는 붕어빵
            탐험 중 발견한 붕어빵을 등록할 수 있습니다. 이때 붕어빵은 하루 한
            번만 등록 가능하니 신중하게 진행해주세요. 이번주에 등록한 붕어빵은
            접시의 요일별 위치에 채워집니다. 등록되지 않은 날은 회색 붕어빵으로
            표시되어 7일 동안 매일 붕어빵을 등록하면 접시 가득 붕어빵이 채워지게
            됩니다. 붕어빵 접시는 일주일마다 초기화되니&nbsp;
            <img
              src="/assets/webp/captureBtn.webp"
              alt="캡처"
              className="h-[3.5vh] align-middle inline"
            />
            버튼을 이용해 기록해 두는 것을 잊지 마세요!
            <p className="text-bold text-point-color font-bold pt-1">
              ◆ 붕어빵 탐험대 소문내기
            </p>
            하단의 카카오톡 또는 클립보드 아이콘은 클릭해서 친구들을 초대해
            주세요! 카카오톡 아이콘을 클릭하면 친구에게 탐험대 초대장을 발부할
            수 있습니다.
            <p className="text-bold text-point-color font-bold pt-1">
              ◆ 메뉴 버튼 이용하기
            </p>
            우측 하단의 &nbsp;
            <img
              src="/assets/webp/menuBtn.webp"
              alt="메뉴"
              className="h-[3.5vh] align-middle inline"
            />
            &nbsp;버튼을 클릭하면
            <img
              src="/assets/webp/captureBtn.webp"
              alt="캡처"
              className="h-[3.5vh] align-middle inline"
            />
            ,
            <img
              src="/assets/webp/calendarBtn.webp"
              alt="일지"
              className="h-[3.5vh] align-middle inline"
            />
            ,
            <img
              src="/assets/webp/bookBtn.webp"
              alt="도감"
              className="h-[3.5vh] align-middle inline"
            />
            버튼이 토글로 나타납니다. &nbsp;
            <img
              src="/assets/webp/captureBtn.webp"
              alt="캡처"
              className="h-[3.5vh] align-middle inline"
            />
            버튼을 클릭해 이번 주에 수집한 붕어 접시를 기록해 보세요!
            <img
              src="/assets/webp/calendarBtn.webp"
              alt="일지"
              className="h-[3.5vh] align-middle inline"
            />
            와&nbsp;
            <img
              src="/assets/webp/bookBtn.webp"
              alt="도감"
              className="h-[3.5vh] align-middle inline"
            />
            버튼은 각 페이지로 이동할 수 있습니다.
          </div>
          <div className="bg-[#630000] text-white w-fit px-2 py-1 rounded-lg">
            붕어빵 등록 화면
          </div>
          <div className="pt-1 pb-6">
            <p className="text-bold text-point-color font-bold pt-1">
              ◆ 붕어빵 사진 등록하기
            </p>
            붕어빵 등록화면에서는 오늘 먹은 붕어빵 사진과 종류, 수량을 하루 한
            번 등록할 수 있습니다. '사진을 추가해 주세요' 영역을 클릭해 오늘
            탐험에서 수집한 붕어빵 사진을 불러와 주세요.
            <p className="text-bold text-point-color font-bold pt-1">
              ◆ 붕어빵 수량 등록하기
            </p>
            사진을 등록했다면 이제 어떤 붕어빵을 수집했는지 기록할 차례입니다.
            '붕어빵 선택' 드롭다운 버튼을 클릭해 붕어빵 종류를 선택해 주세요.
            원하는 붕어빵 종류가 없다면 '미확인 붕어빵'을 선택해 주세요!
            <br />
            마지막으로 선택한 붕어빵 종류의 [-] [+] 버튼을 이용해 붕어빵의 수량
            설정 후 [확인] 버튼을 클릭해 오늘의 붕어빵 보고서를 제출해 주세요.
          </div>
          <div className="bg-[#630000] text-white w-fit px-2 py-1 rounded-lg">
            붕어빵 등록 완료 화면
          </div>
          <div className="pt-1 pb-6">
            붕어빵 등록 완료 화면에서는 오늘 탐험 중에 발견한 붕어빵을
            일러스트오 함께 확인할 수 있습니다. 여러 종류의 붕어빵을 등록했다면
            슬라이드를 옆으로 넘겨보세요~ 미확인 붕어빵 슬라이드에서는
            [제보하기] 버튼을 눌러 미확인 붕어빵 제보 화면으로 이동할 수
            있습니다.
          </div>
          <div className="bg-[#630000] text-white w-fit px-2 py-1 rounded-lg">
            미확인 붕어빵 제보 화면
          </div>
          <div className="pt-1 pb-6">
            아직 아무도 발견하지 못한 붕어빵을 발견하셨군요! 확인되지 않은
            붕어빵 종류를 붕어빵 탐험대 팀에게 제보해 주시면 추후 붕어빵 등록과
            도감 화면에 업데이트됩니다. 붕어빵 이름을 쉼표로 구분해(ex) 팥
            붕어빵, 슈크림 붕어빵) 입력 후 확인 버튼을 눌러 주세요. 붕어빵 이름
            제출 후에는 메인 화면으로 이동합니다.
          </div>
          <div className="bg-[#630000] text-white w-fit px-2 py-1 rounded-lg">
            날짜별 일지 화면
          </div>
          <div className="pt-1 pb-6">
            일지 화면에서는 날짜별로 붕어빵을 수집한 날은 노란색 붕어빵
            <img
              src="/assets/webp/cal-bun.webp"
              alt="붕어 수집한 날"
              className="h-[3.5vh] align-middle inline"
            />
            으로, 붕어빵을 수집하지 못 한 날은 회색 붕어빵
            <img
              src="/assets/webp/cal-bun-empty.webp"
              alt="붕어 수집 못한 날"
              className="h-[3.5vh] align-middle inline"
            />
            으로 표시됩니다. 노란 붕어빵으로 표시된 날짜를 클릭하면 해당 날짜에
            작성된 일지 상세 페이지로 이동할 수 있습니다.
          </div>
          <div className="bg-[#630000] text-white w-fit px-2 py-1 rounded-lg">
            일지 상세 화면
          </div>
          <div className="pt-1 pb-6">
            <p className="text-bold text-point-color font-bold pt-1">
              ◆ 작성된 일지 확인하기
            </p>
            일지 상세 화면에서는 해당 날짜에 수집한 붕어빵에 대한 정보를 확인할
            수 있습니다. [붕어빵 등록 화면]에서 등록한 사진과 붕어빵 정보를
            바탕으로 작성된 일지를 확인 할 수 있습니다. 일지에서 날짜와 사진을
            제외한 정보는 수정 가능하니 나만의 일지를 채워 나가보세요!
            <p className="text-bold text-point-color font-bold pt-1">
              ◆ 날씨 변경하기
            </p>
            붕어빵 탐험대에서 제공하는 일지는 '어쨌든 맑음'을 기본 선택 값으로
            합니다. 날씨 부분을 클릭하면 토글 버튼을 이용해 원하는 날씨로 수정할
            수 있습니다.
            <p className="text-bold text-point-color font-bold pt-1">
              ◆ 일지 수정하기
            </p>
            일지는 붕어빵 등록 정보를 바탕으로 자동 작성됩니다. 내용을 수정하고
            싶다면 [일지 수정하기] 버튼을 눌러 자유롭게 일지를 작성할 수
            있습니다. [원문 지우기] 버튼을 이용하면 기존의 일지를 모두 지울 수
            있습니다. 일지가 모두 작성되면 [저장] 버튼을 눌러 수정된 일지를
            확인해 주세요!
          </div>

          <div className="bg-[#630000] text-white w-fit px-2 py-1 rounded-lg">
            도감 화면
          </div>
          <div className="pt-1 pb-6">
            도감 화면에서는 붕어빵 탐험에서 수집할 수 있는 모든 종류의 붕어빵을
            확인할 수 있습니다. 아직 수집하지 못한 붕어빵은 투명하게 표시되고,
            수집한 붕어빵을 누르면 최근 3개월 내 해당 붕어빵을 수집한 날짜를
            확인 할 수 있습니다. 날짜를 클릭하면 해당 날짜에 작성된 일지
            화면으로 이동합니다. 여러 종류의 붕어빵을 모아 도감을 채워
            나가보세요!
          </div>
        </div>
        <button
          className="my-4 bg-[#630000] hover:bg-white hover:text-[#630000] text-white border-4 font-bold py-2 px-6 rounded-full w-72 text-sz35 tracking-[.25em] h-[8dvh]"
          onClick={moveToLogin}
        >
          탐험 떠나기
        </button>
      </div>
    </div>
  );
}

export default TutorialPage;
