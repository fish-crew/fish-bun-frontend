import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const MetaTags = () => {
  const location = useLocation();
  let title, description, image, url;

  switch (location.pathname) {
    case "/bungBalGamePage":
      title = "붕어빵 취향 테스트";
      description = "나는 어떤 붕어빵일까?";
      image = "https://bunglog.me/assets/png/bungBalMetaImg.png";
      url = "https://bunglog.me/bungBalGamePage";
      break;

    default:
      title = "붕어빵 탐험";
      description = "팥냥이와 함께 떠나는 탐험";
      image = "https://bunglog.me/assets/png/bunglogMetaImg.png";
      url = "https://bunglog.me/";
      break;
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default MetaTags;
