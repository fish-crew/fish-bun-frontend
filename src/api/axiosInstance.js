import axios from 'axios';
import { getCookie } from './cookie'; // 쿠키 읽기 유틸리티 함수

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'https://bunglog.me/api', // API 기본 URL
    timeout: 10000, // 요청 제한 시간
    withCredentials: true, // 쿠키를 포함한 요청 허용
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getCookie(); // 쿠키에서 accessToken 읽기
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Authorization 헤더에 추가
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;