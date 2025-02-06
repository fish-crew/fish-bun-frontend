const tutorialPages = [
  {
    image: "/assets/webp/tutorialImgs/loading.webp",
    title: "로딩 화면",
    text: ` <p>
        <div className="text-start text-sz25">
          팥냥이와 함께 떠나는 붕어빵 탐험!<br>팥냥이가 탐험대원분들을 안내해
          줍니다.
        </div>
      </p>`,
  },
  {
    title: "로그인 화면",
    image: "/assets/webp/tutorialImgs/login.webp",
    text: `<span>
              본격적인 탐험을 떠나기 위해서는 탐험대원 여러분의 신원 확인이
              필요합니다. 노란색&nbsp;
            </span>
            <img
              src="/assets/webp/kakao_login_medium_narrow.webp"
              alt="카카오 로그인 버튼"
              className="h-[3.5vh] align-middle inline"
            />
            <span>버튼을 클릭해 로그인을 진행해 주세요.</span>`,
  },
  {
    title: "닉네임 설정 화면",

    image: "/assets/webp/tutorialImgs/nickname.webp",
    text: ` <div>
            붕어빵 탐험에서 사용할 닉네임을 설정해 주세요! 공백 포함 최대
            7글자까지 설정 가능합니다. 원하는 이름을 입력했다면 확인 버튼을
            눌러주세요.
          </div>`,
  },
  {
    title: "메인 화면",
    image: "/assets/webp/tutorialImgs/main.webp",
    text: `<p className="text-bold text-point-color font-bold">
              <img
              src="/assets/webp/cal-bun.webp"
              alt="<br><img
              src="/assets/webp/cal-bun.webp"
              alt="◆"
            
            /> <span class="text-[#1069b0] text-sz30 font-bold">붕어빵 등록하기</span>
            </p>
            붕어빵 탐험대에 합류하게 되신 걸 환영합니다! 메인 화면에서는 붕어빵
            탐험 중 발견한 붕어빵을 등록할 수 있습니다. 이때 붕어빵은 <span class=" px-2 py-1 bg-[#1069b0] text-white rounded-md">접시 중앙의 + 버튼</span>을 이용해 하루 한
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
              <br><img
              src="/assets/webp/cal-bun.webp"
              alt="<br><img
              src="/assets/webp/cal-bun.webp"
              alt="◆"
            
            /> <span class="text-[#1069b0] text-sz30 font-bold">붕어빵 탐험대 소문내기</span>
            </p>
            하단의 카카오톡 또는 클립보드 아이콘<img
                src="/assets/webp/tutorialImgs/sns-sharing.webp"
                alt="붕어빵 탐험대 소문내기 영역"
                className="h-[3.5vh] align-middle inline "
              />을 클릭해서 친구들을 초대해
            주세요! 카카오톡 아이콘을 클릭하면 친구에게 탐험대 초대장을 발부할
            수 있습니다.
            <p className="text-bold text-point-color font-bold pt-1">
              <br><img
              src="/assets/webp/cal-bun.webp"
              alt="<br><img
              src="/assets/webp/cal-bun.webp"
              alt="◆"
            
            /> <span class="text-[#1069b0] text-sz30 font-bold">메뉴 버튼 이용하기</span>
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
            버튼은 각 페이지로 이동할 수 있습니다.`,
  },
  {
    title: "붕어빵 등록 화면",
    image: "/assets/webp/tutorialImgs/add.webp",
    text: ` <p className="text-bold text-point-color font-bold pt-1">
              <img
              src="/assets/webp/cal-bun.webp"
              alt="<br><img
              src="/assets/webp/cal-bun.webp"
              alt="◆"
            /> <span class="text-[#1069b0] text-sz30 font-bold">붕어빵 사진 등록하기</span>
            </p>
            붕어빵 등록화면에서는 오늘 먹은 붕어빵 사진과 종류, 수량을 하루 한
            번 등록할 수 있습니다. '사진을 추가해 주세요' 영역을 클릭해 오늘
            탐험에서 수집한 붕어빵 사진을 불러와 주세요.
            <p className="text-bold text-point-color font-bold pt-1">
              <br><img
              src="/assets/webp/cal-bun.webp"
              alt="<br><img
              src="/assets/webp/cal-bun.webp"
              alt="◆"
            /> <span class="text-[#1069b0] text-sz30 font-bold">붕어빵 수량 등록하기</span>
            </p>
            사진을 등록했다면 이제 어떤 붕어빵을 수집했는지 기록할 차례입니다.
            '붕어빵 선택' 드롭다운 버튼을 클릭해 붕어빵 종류를 선택해 주세요.
            원하는 붕어빵 종류가 없다면 '미확인 붕어빵'을 선택해 주세요!
            <br />
            마지막으로 선택한 붕어빵 종류의 [-] [+] 버튼을 이용해 붕어빵의 수량
            설정 후 [확인] 버튼을 클릭해 오늘의 붕어빵 보고서를 제출해 주세요.
          </div>
          `,
  },
  {
    title: "붕어빵 등록 완료 화면",
    image: "/assets/webp/tutorialImgs/reg-succ.webp",
    text: `  붕어빵 등록 완료 화면에서는 오늘 탐험 중에 발견한 붕어빵을
            일러스트오 함께 확인할 수 있습니다. 여러 종류의 붕어빵을 등록했다면
            슬라이드를 옆으로 넘겨보세요~ 미확인 붕어빵 슬라이드에서는
            [제보하기] 버튼을 눌러 미확인 붕어빵 제보 화면으로 이동할 수
            있습니다.`,
  },
  {
    title: "미확인 붕어빵 제보 화면",

    image: "/assets/webp/tutorialImgs/reg.webp",
    text: `아직 아무도 발견하지 못한 붕어빵을 발견하셨군요! 확인되지 않은
            붕어빵 종류를 붕어빵 탐험대 팀에게 제보해 주시면 추후 붕어빵 등록과
            도감 화면에 업데이트됩니다. 붕어빵 이름을 쉼표로 구분해(ex) 팥
            붕어빵, 슈크림 붕어빵) 입력 후 확인 버튼을 눌러 주세요. 붕어빵 이름
            제출 후에는 메인 화면으로 이동합니다.`,
  },
  {
    title: "날짜별 일지 화면",

    image: "/assets/webp/tutorialImgs/cal.webp",
    text: ` 일지 화면에서는 날짜별로 붕어빵을 수집한 날은 노란색 붕어빵
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
            작성된 일지 상세 페이지로 이동할 수 있습니다.`,
  },
  {
    title: "일지 상세 화면",

    image: "/assets/webp/tutorialImgs/detail.webp",
    text: `  <p className="text-bold text-point-color font-bold pt-1">
              <img
              src="/assets/webp/cal-bun.webp"
              alt="◆"
            /> <span class="text-[#1069b0] text-sz30 font-bold">작성된 일지 확인하기</span>
            </p>
            일지 상세 화면에서는 해당 날짜에 수집한 붕어빵에 대한 정보를 확인할
            수 있습니다. [붕어빵 등록 화면]에서 등록한 사진과 붕어빵 정보를
            바탕으로 작성된 일지를 확인 할 수 있습니다. 일지에서 날짜와 사진을
            제외한 정보는 수정 가능하니 나만의 일지를 채워 나가보세요!
            <p className="text-bold text-point-color font-bold pt-1">
              <br><img
              src="/assets/webp/cal-bun.webp"
              alt="◆"
            /> <span class="text-[#1069b0] text-sz30 font-bold">날씨 변경하기</span>
            </p>
            붕어빵 탐험대에서 제공하는 일지는 '어쨌든 맑음'을 기본 선택 값으로
            합니다. 날씨 부분을 클릭하면 토글 버튼을 이용해 원하는 날씨로 수정할
            수 있습니다.
            <p className="text-bold text-point-color font-bold pt-1">
              <br><img
              src="/assets/webp/cal-bun.webp"
              alt="◆"
            /> <span class="text-[#1069b0] text-sz30 font-bold">일지 수정하기</span>
            </p>
            일지는 붕어빵 등록 정보를 바탕으로 자동 작성됩니다. 내용을 수정하고
            싶다면 [일지 수정하기] 버튼을 눌러 자유롭게 일지를 작성할 수
            있습니다. [원문 지우기] 버튼을 이용하면 기존의 일지를 모두 지울 수
            있습니다. 일지가 모두 작성되면 [저장] 버튼을 눌러 수정된 일지를
            확인해 주세요!`,
  },
  {
    title: "도감 화면",

    image: "/assets/webp/tutorialImgs/book.webp",
    text: `도감 화면에서는 붕어빵 탐험에서 수집할 수 있는 모든 종류의 붕어빵을
            확인할 수 있습니다. 아직 수집하지 못한 붕어빵은 투명하게 표시되고,
            수집한 붕어빵을 누르면 최근 3개월 내 해당 붕어빵을 수집한 날짜를
            확인 할 수 있습니다. 날짜를 클릭하면 해당 날짜에 작성된 일지
            화면으로 이동합니다. 여러 종류의 붕어빵을 모아 도감을 채워
            나가보세요!`,
  },
];

export default tutorialPages;
