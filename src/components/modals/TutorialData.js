const tutorialPages = [
  {
    image: "/images/page1.png",
    text: (
      <p>
        text:{" "}
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
      </p>
    ),
  },
  { image: "/images/page2.png", text: "Here is <em>how you start</em>." },
  { image: "/images/page3.png", text: "<u>Discover amazing features</u>." },
  {
    image: "/images/page4.png",
    text: "Stay connected <span style='color:blue;'>anytime</span>.",
  },
  { image: "/images/page5.png", text: "Secure and <b>reliable</b>." },
  { image: "/images/page6.png", text: "Get <i>support</i> easily." },
  { image: "/images/page7.png", text: "<mark>Customizable</mark> for you." },
  {
    image: "/images/page8.png",
    text: "Start your journey <small>now!</small>",
  },
];

export default tutorialPages;
