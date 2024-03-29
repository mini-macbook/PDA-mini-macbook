import { afterLoginInstance } from "./AxiosInstance";

// product detail 받아오기
// 위시리스트 조회  /api/funding/:fundingId
export const fetchFundingDetail = async (fundingId) => {
  try {
    console.log(fundingId);
    const response = await afterLoginInstance.get(`/funding/${fundingId}`);
    return response.data; // 서버에서 받은 데이터 반환
  } catch (error) {
    console.error("Error fetching wishes:", error);
    throw error; // 에러를 다시 던져서 상위 컴포넌트에서 처리할 수 있도록 함
  }
};

// 펀딩하기
export const fetchFundingPost = async (fundingId, data) => {
  try {
    console.log(typeof data);
    const response = await afterLoginInstance.post(
      `/funding/${fundingId}`,
      data
    );
    return response.data; // 서버에서 받은 데이터 반환
  } catch (error) {
    console.error("Error fetching wishes:", error);
    throw error; // 에러를 다시 던져서 상위 컴포넌트에서 처리할 수 있도록 함
  }
};
