export function getCookie() {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === 'accessToken') { // 고정된 key 값
            return value;
        }
    }
    return null;
}
