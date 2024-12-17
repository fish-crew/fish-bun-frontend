import axiosInstance from './axiosInstance';

//공통 함수로 로직 개선하는 방법도 나중에 생각
//get
export async function fetchUserData() {
    try {
        const response = await axiosInstance.get(
            '/fish-bun/user/info'
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
            '/fish-bun/main'
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
            `/fish-bun/detail/save-success/${id}` //아직 api 없음
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
            '/fish-bun/book/user'
        );
        return response.data;
    } catch (error) {
        console.error('데이터 요청 실패:', error);
        throw error;
    }
}

export async function fetchCalendarPageData(date) {
    try {
        const response = await axiosInstance.get(
            `/fish-bun/calendar/${date}`
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
            `/fish-bun/calendar/detail/${id}`
        );
        return response.data;
    } catch (error) {
        console.error('데이터 요청 실패:', error);
        throw error;
    }
}

export async function fetchFlavorData() {
    try {
        const response = await axiosInstance.get(
            '/fish-bun/flavors'
        );
        return response.data;
    } catch (error) {
        console.error('데이터 요청 실패:', error);
        throw error;
    }
}

//post
export async function postNickNameAddData(nickname) {
    try {
        const response = await axiosInstance.post(
            '/fish-bun/user/set-nickname', // API 엔드포인트
            { nickname } // 객체 형태로 데이터 전달
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
            '/fish-bun/detail/save', // API 엔드포인트
            registerData, // FormData 객체
            {
                headers: {
                    // Content-Type 설정 생략 가능: Axios가 자동으로 처리
                },
            }
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
