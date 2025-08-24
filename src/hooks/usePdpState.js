import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function usePdpState() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 상태 초기값
  const [color, setColor] = useState(() => searchParams.get("color") || null);
  const [size, setSize] = useState(() => searchParams.get("size") || null);
  const [quantity, setQuantity] = useState(
    () => parseInt(searchParams.get("qty")) || 1
  );
  const [deliveryMethod, setDeliveryMethod] = useState(
    () => searchParams.get("delivery") || "standard"
  );

  // URL 쿼리 파라미터 동기화
  const updateSearchParams = useCallback(
    (updates) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, value.toString());
        }
      });

      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // 색상 변경
  const handleColorChange = useCallback(
    (newColor) => {
      setColor(newColor);
      updateSearchParams({ color: newColor });

      // 색상 변경 시 사이즈 초기화
      if (size) {
        setSize(null);
        updateSearchParams({ size: null });
      }
    },
    [size, updateSearchParams]
  );

  // 사이즈 변경
  const handleSizeChange = useCallback(
    (newSize) => {
      setSize(newSize);
      updateSearchParams({ size: newSize });
    },
    [updateSearchParams]
  );

  // 수량 변경
  const handleQuantityChange = useCallback(
    (newQuantity) => {
      const validQuantity = Math.max(1, Math.min(999, newQuantity));
      setQuantity(validQuantity);
      updateSearchParams({ qty: validQuantity });
    },
    [updateSearchParams]
  );

  // 배송 방법 변경
  const handleDeliveryMethodChange = useCallback(
    (newMethod) => {
      setDeliveryMethod(newMethod);
      updateSearchParams({ delivery: newMethod });
    },
    [updateSearchParams]
  );

  // URL 변경 시 상태 동기화
  useEffect(() => {
    const urlColor = searchParams.get("color");
    const urlSize = searchParams.get("size");
    const urlQuantity = searchParams.get("qty");
    const urlDelivery = searchParams.get("delivery");

    if (urlColor !== color) {
      setColor(urlColor);
    }
    if (urlSize !== size) {
      setSize(urlSize);
    }
    if (urlQuantity && parseInt(urlQuantity) !== quantity) {
      setQuantity(parseInt(urlQuantity));
    }
    if (urlDelivery && urlDelivery !== deliveryMethod) {
      setDeliveryMethod(urlDelivery);
    }
  }, [searchParams, color, size, quantity, deliveryMethod]);

  // 상태 초기화
  const resetState = useCallback(() => {
    setColor(null);
    setSize(null);
    setQuantity(1);
    setDeliveryMethod("standard");
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  // 현재 선택된 옵션의 재고 확인
  const getCurrentStock = useCallback(
    (product) => {
      if (!color || !size || !product) return 0;

      const colorData = product.colors?.find((c) => c.name === color);
      const sizeData = product.sizes?.find((s) => s.name === size);

      if (!colorData || !sizeData) return 0;

      // 색상과 사이즈 중 더 적은 재고 반환
      return Math.min(colorData.stock || 0, sizeData.stock || 0);
    },
    [color, size]
  );

  // 옵션 선택 완료 여부
  const isOptionsComplete = color && size;

  // 선택된 옵션 요약
  const getSelectedOptionsSummary = useCallback(() => {
    const summary = [];

    if (color) {
      summary.push(`색상: ${color}`);
    }
    if (size) {
      summary.push(`사이즈: ${size}`);
    }
    if (quantity > 1) {
      summary.push(`수량: ${quantity}개`);
    }
    if (deliveryMethod === "express") {
      summary.push("빠른배송");
    }

    return summary;
  }, [color, size, quantity, deliveryMethod]);

  return {
    // 상태
    color,
    size,
    quantity,
    deliveryMethod,

    // 상태 변경 함수
    setColor: handleColorChange,
    setSize: handleSizeChange,
    setQuantity: handleQuantityChange,
    setDeliveryMethod: handleDeliveryMethodChange,

    // 유틸리티 함수
    resetState,
    getCurrentStock,
    isOptionsComplete,
    getSelectedOptionsSummary,

    // 원본 상태 (URL 동기화 없이)
    _setColor: setColor,
    _setSize: setSize,
    _setQuantity: setQuantity,
    _setDeliveryMethod: setDeliveryMethod,
  };
}
