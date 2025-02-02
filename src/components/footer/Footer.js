import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const isSpecialPage = ["/main", "/register/addPage"].includes(
    location.pathname
  );

  const footerColor = isSpecialPage
    ? "bg-[#650000] text-[#edebeb]"
    : "bg-[#f1f0ec] text-[#650000]";

  const SocialButton = ({ iconPath, onClick, label }) => (
    <button
      className="flex justify-center items-center p-2  hover:bg-gray-300 rounded"
      onClick={onClick}
      aria-label={label}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi"
        viewBox="0 0 16 16"
      >
        <path d={iconPath} />
      </svg>
    </button>
  );

  useEffect(() => {
    const Kakao = typeof window !== "undefined" ? window.Kakao : null;
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init("2f592f29ac8bd230f9554175da46fedd");
      console.log("Kakao initialized:", Kakao.isInitialized());
    }
  }, []);

  const shareKakao = () => {
    const Kakao = typeof window !== "undefined" ? window.Kakao : null;
    if (Kakao) {
      Kakao.Share.sendCustom({
        templateId: 115802,
        templateArgs: {
          PROFILE: "https://bunglog.me/",
          THUMB: "https://bunglog.me/",
        },
      });
    } else {
      console.error("Kakao SDK is not initialized.");
    }
  };

  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const htmlContent = `[붕어빵 탐험대]<br>팥냥이와 함께 떠나는 붕어빵 탐험!<br><a href="https://bunglog.me">https://bunglog.me</a>`;
    const plainText = `[붕어빵 탐험대]\n팥냥이와 함께 떠나는 붕어빵 탐험!\nhttps://bunglog.me`;

    if (navigator.clipboard && navigator.clipboard.write) {
      try {
        const htmlBlob = new Blob([htmlContent], { type: "text/html" });
        const textBlob = new Blob([plainText], { type: "text/plain" });
        const clipboardItem = new ClipboardItem({
          "text/html": htmlBlob,
          "text/plain": textBlob,
        });

        await navigator.clipboard.write([clipboardItem]);
        setCopied(true);
        alert("클립보드에 복사되었습니다!");
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy link:", error);
        alert("클립보드 복사에 실패했습니다.");
      }
    }
  };

  const buttons = [
    {
      label: "Share on Kakao",
      iconPath:
        "M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15",
      onClick: shareKakao,
    },
    {
      label: "Copy Link",
      iconPath: `
       M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z
        M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z
      `,
      onClick: handleCopyLink,
    },
  ];

  const snsButtons = [
    {
      label: "Visit 붕어빵 탐험대 Instagram",
      iconPath:
        "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334",
      onClick: () => alert("붕어빵 탐험대 인스타그램 방문하기"),
    },
    {
      label: "Visit 붕어빵 탐험대 X",
      iconPath: `
       M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z
      `,
      onClick: () => alert("붕어빵 탐험대 X 방문하기"),
    },
  ];

  const isCoupangTxtPage = ["/register/reportPage"].includes(location.pathname);

  const coupangAds = !isCoupangTxtPage ? (
    <div className="w-full flex items-center justify-between">
      <div className="flex justify-center items-center">
        <div className="pe-1">공유하기</div>
        {buttons.map((btn, idx) => (
          <SocialButton
            key={idx}
            iconPath={btn.iconPath}
            onClick={btn.onClick}
            label={btn.label}
          />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <div className="pe-1">붕어빵탐험대</div>
        {snsButtons.map((btn, idx) => (
          <SocialButton
            key={idx}
            iconPath={btn.iconPath}
            onClick={btn.onClick}
            label={btn.label}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="text-[1.8dvh] text-center w-full text-gray-400">
      *파트너 활동을 통해 일정액의 수수료를 제공받을 수 있음
    </div>
  );

  return (
    <div>
      <div className="mx-auto bg-gray-200">
        <div
          className={`w-full text-sz23 flex px-4 items-center justify-between ${footerColor}`}
        >
          {coupangAds} {/* JSX 요소로 직접 삽입 */}
        </div>
        <iframe
          src="https://ads-partners.coupang.com/widgets.html?id=835435&template=carousel&trackingCode=AF6298929&subId=&width=680&height=108&tsource="
          width="100%"
          height="90"
          frameBorder="0"
          scrolling="no"
          referrerPolicy="unsafe-url"
          browsingtopics
        ></iframe>
      </div>
    </div>
  );
}

export default Footer;
