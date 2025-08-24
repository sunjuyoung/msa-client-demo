import { useMutation, useQueryClient } from "@tanstack/react-query";

// Mock API function - 실제로는 API에서 호출
const addToCartAPI = async (lineItem) => {
  // API 호출 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 에러 발생 시뮬레이션 (10% 확률)
  if (Math.random() < 0.1) {
    throw new Error("장바구니 추가에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }

  // 성공 응답
  return {
    success: true,
    cartItemId: `cart_${Date.now()}`,
    message: "장바구니에 추가되었습니다.",
  };
};

export function useAddToCart() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addToCartAPI,
    onSuccess: (data, variables) => {
      // 장바구니 쿼리 무효화 (새로고침)
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      // 장바구니 개수 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["cartCount"] });

      // 최근본 상품 갱신
      updateRecentlyViewed(variables.productId);

      // 로컬 스토리지에 장바구니 아이템 추가 (임시)
      addToLocalCart(variables);

      console.log("장바구니 추가 성공:", data);
    },
    onError: (error, variables) => {
      console.error("장바구니 추가 실패:", error);

      // 에러 로깅 (실제로는 에러 추적 서비스 사용)
      logError("addToCart", error, variables);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    reset: mutation.reset,
  };
}

// 최근본 상품 갱신
function updateRecentlyViewed(productId) {
  try {
    const recentlyViewed = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]"
    );

    // 이미 존재하는 상품이면 제거
    const filtered = recentlyViewed.filter((id) => id !== productId);

    // 맨 앞에 추가
    filtered.unshift(productId);

    // 최대 20개까지만 유지
    const limited = filtered.slice(0, 20);

    localStorage.setItem("recentlyViewed", JSON.stringify(limited));
  } catch (error) {
    console.error("최근본 상품 갱신 실패:", error);
  }
}

// 로컬 스토리지에 장바구니 아이템 추가 (임시)
function addToLocalCart(lineItem) {
  try {
    const localCart = JSON.parse(localStorage.getItem("localCart") || "[]");

    // 동일한 상품이 이미 있는지 확인
    const existingIndex = localCart.findIndex(
      (item) =>
        item.productId === lineItem.productId &&
        item.color === lineItem.color &&
        item.size === lineItem.size
    );

    if (existingIndex >= 0) {
      // 기존 아이템 수량 증가
      localCart[existingIndex].quantity += lineItem.quantity;
    } else {
      // 새 아이템 추가
      localCart.push({
        ...lineItem,
        addedAt: new Date().toISOString(),
      });
    }

    localStorage.setItem("localCart", JSON.stringify(localCart));
  } catch (error) {
    console.error("로컬 장바구니 추가 실패:", error);
  }
}

// 에러 로깅
function logError(action, error, variables) {
  const errorLog = {
    action,
    error: error.message,
    variables,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  // 실제로는 에러 추적 서비스로 전송
  console.error("Error Log:", errorLog);

  // 로컬 스토리지에 에러 로그 저장 (개발용)
  try {
    const errorLogs = JSON.parse(localStorage.getItem("errorLogs") || "[]");
    errorLogs.push(errorLog);

    // 최대 100개까지만 유지
    if (errorLogs.length > 100) {
      errorLogs.splice(0, errorLogs.length - 100);
    }

    localStorage.setItem("errorLogs", JSON.stringify(errorLogs));
  } catch (e) {
    console.error("에러 로그 저장 실패:", e);
  }
}
