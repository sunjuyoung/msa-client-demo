import axios from "axios";

const COUPON_BASE_URL = "http://localhost:8080/coupon-service";

// 사용자의 쿠폰 목록 조회
export const fetchUserCoupons = async (userId) => {
  try {
    const response = await axios.get(
      `${COUPON_BASE_URL}/coupons/user/${userId}`
    );

    if (response.data.code === "200") {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "쿠폰 조회에 실패했습니다.");
    }
  } catch (error) {
    console.error("쿠폰 조회 오류:", error);
    throw new Error(
      error.response?.data?.message || "쿠폰 조회에 실패했습니다."
    );
  }
};

// 선착순 쿠폰 사용
export const useCoupon = async (userCouponId, userId) => {
  try {
    const response = await axios.post(
      `${COUPON_BASE_URL}/coupons/${userCouponId}/issue/event?userId=${userId}`
    );

    if (response.data.code === "200") {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "쿠폰 사용에 실패했습니다.");
    }
  } catch (error) {
    console.error("쿠폰 사용 오류:", error);
    throw new Error(
      error.response?.data?.message || "쿠폰 사용에 실패했습니다."
    );
  }
};
