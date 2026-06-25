const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

export const SITE_URL = trimTrailingSlash(
  process.env.REACT_APP_SITE_URL || "https://bunglog.coreluma.kr"
);

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "/api";

export const KAKAO_LOGIN_URL = `${trimTrailingSlash(
  API_BASE_URL
)}/oauth2/authorization/kakao`;
