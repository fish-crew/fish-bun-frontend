import axiosInstance from './axiosInstance';

//공통 함수로 로직 개선하는 방법도 나중에 생각
//get
export async function fetchUserData() {
    try {
        const response = await axiosInstance.get(
            '/fish-bun/user-info'
        );
        return response.data;
    } catch (error) {
        console.error('데이터 요청 실패:', error);
        throw error;
    }
}

export async function fetchMainPageData() {
    try {
        const response = await axiosInstance.get(
            'fish-bun/main'
        );
        return response.data;
    } catch (error) {
        console.error('데이터 요청 실패:', error);
        throw error;
    }
}

export async function fetchRegisterSuccessPageData(id) {
    try {
        const response = await axiosInstance.get(
            `fish-bun/register-success/${id}` //아직 api 없음
        );
        return response.data;
    } catch (error) {
        console.error('데이터 요청 실패:', error);
        throw error;
    }
}

export async function fetchAllBunFlavorsData() {
    try {
        const response = await axiosInstance.get(
            'fish-bun/flavors'
        );
        return response.data;
    } catch (error) {
        console.error('데이터 요청 실패:', error);
        throw error;
    }
}

export async function fetchBookPageData() {
    try {
        const response = await axiosInstance.get(
            'fish-bun/book/user'
        );
        return response.data;
    } catch (error) {
        console.error('데이터 요청 실패:', error);
        throw error;
    }
}

export async function fetchCalendarPageData() {
    try {
        const response = await axiosInstance.get(
            'fish-bun/calendar'
        );
        return response.data;
    } catch (error) {
        console.error('데이터 요청 실패:', error);
        throw error;
    }
}

export async function fetchDetailPageData(id) {
    try {
        const response = await axiosInstance.get(
            `fish-bun/calendar/detail/${id}`
        );
        return response.data;
    } catch (error) {
        console.error('데이터 요청 실패:', error);
        throw error;
    }
}

//post
export async function postNickNameAddData(nickName) {
    try {
        const response = await axiosInstance.post(
            '/fish-bun/nickName', // API 엔드포인트
            nickName // 요청 본문에 전달할 데이터
        );
        return response.data;
    } catch (error) {
        console.error('POST 요청 실패:', error);
        throw error;
    }
}

export async function postRegisterData(registerData) {
    try {
        const response = await axiosInstance.post(
            '/fish-bun/register', // API 엔드포인트
            registerData // 요청 본문에 전달할 데이터
        );
        return response.data;
    } catch (error) {
        console.error('POST 요청 실패:', error);
        throw error;
    }
}

export async function postReportData(reportData) {
    try {
        const response = await axiosInstance.post(
            '/fish-bun/report', // API 엔드포인트
            reportData // 요청 본문에 전달할 데이터
        );
        return response.data;
    } catch (error) {
        console.error('POST 요청 실패:', error);
        throw error;
    }
}
