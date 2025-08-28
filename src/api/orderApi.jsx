import axios from "axios";

const BASE_URL = "http://localhost:8080";

// 주문 생성 API
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/order-payment-service/ordering/create`,
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("주문 생성 실패:", error);
    throw error;
  }
};
