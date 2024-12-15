export function getCookie(name) {
    return document.cookie.split('=')[1]; // accessToken 값 반환
}