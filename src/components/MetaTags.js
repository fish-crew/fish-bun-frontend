import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const MetaTags = () => {
  const location = useLocation();

  // `/bungBalGamePage`일 때 적용할 메타 태그 설정
  const isBungBalGamePage = location.pathname === "/bungBalGamePage";

  return (
    <Helmet>
      <title>{isBungBalGamePage ? "붕어빵 취향 테스트" : "붕어빵 탐험"}</title>

      <meta
        property="og:title"
        content={isBungBalGamePage ? "붕어빵 취향 테스트" : "붕어빵 탐험"}
      />
      <meta
        property="og:description"
        content={
          isBungBalGamePage
            ? "나는 어떤 붕어빵일까?"
            : "팥냥이와 함께 떠나는 탐험"
        }
      />
      <meta
        property="og:image"
        content={
          isBungBalGamePage
            ? "https://bunglog.me/assets/png/bungBalMetaImg.png"
            : "https://bunglog.me/assets/png/bunglogMetaImg.png"
        }
      />
      <meta
        property="og:url"
        content={`https://bunglog.me${location.pathname}`}
      />

      {/*트위터 카드 설정 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={isBungBalGamePage ? "붕어빵 취향 테스트" : "붕어빵 탐험"}
      />
      <meta
        name="twitter:description"
        content={
          isBungBalGamePage
            ? "나는 어떤 붕어빵일까?"
            : "팥냥이와 함께 떠나는 탐험"
        }
      />
      <meta
        name="twitter:image"
        content={
          isBungBalGamePage
            ? "https://bunglog.me/assets/png/bungBalMetaImg.png"
            : "https://bunglog.me/assets/png/bunglogMetaImg.png"
        }
      />
    </Helmet>
  );
};

export default MetaTags;
