import { afterLoginInstance } from "./AxiosInstance";

// 위시리스트 받아오기 (미완)
// 위시리스트 조회  /api/user/wish/:phoneNumber
export const fetchWishes = async (phoneNumber) => {
  try {
    const response = await afterLoginInstance.get(`/user/wish/${phoneNumber}`);
    return response.data; // 서버에서 받은 데이터 반환
  } catch (error) {
    console.error("Error fetching wishes:", error);
    throw error; // 에러를 다시 던져서 상위 컴포넌트에서 처리할 수 있도록 함
  }
};

// 위시리스트에 상품 추가하기
export const fetchWishPost = async (productId, message) => {
  console.log("productId:", productId, "message:", message);
  try {
    const response = await afterLoginInstance.post(`/user/wish/`, {
      data: { productId: productId, message: message }, // Pass data in the 'data' property
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 위시리스트에 상품 삭제하기
export const fetchWishDelete = async (productId) => {
  console.log("productId:", productId);
  try {
    const response = await afterLoginInstance.delete(`/user/wish/`, {
      data: { productId: productId }, // Pass data in the 'data' property
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
