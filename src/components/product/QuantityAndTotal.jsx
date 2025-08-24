import { useState, useEffect } from "react";
import { Box, Typography, IconButton, TextField, Alert } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { usePdpState } from "../../hooks/usePdpState";

// KRW 포맷터 함수
const formatKRW = (amount) => {
  if (typeof amount !== "number") return "0원";
  return Math.round(amount).toLocaleString("ko-KR") + "원";
};

export function QuantityAndTotal({ product }) {
  const { quantity, setQuantity, color, size, deliveryMethod } = usePdpState();
  const [quantityError, setQuantityError] = useState("");
  const [inputValue, setInputValue] = useState(quantity.toString());

  const { price, memberPrice } = product;

  // 수량 변경 시 입력값 동기화
  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  // 수량 유효성 검사
  const validateQuantity = (value) => {
    const numValue = parseInt(value);

    if (isNaN(numValue) || numValue < 1) {
      return "수량은 1개 이상이어야 합니다.";
    }

    if (numValue > 999) {
      return "수량은 999개 이하여야 합니다.";
    }

    return "";
  };

  // 수량 증가
  const handleIncrease = () => {
    const newQuantity = Math.min(quantity + 1, 999);
    setQuantity(newQuantity);
    setQuantityError("");
  };

  // 수량 감소
  const handleDecrease = () => {
    const newQuantity = Math.max(quantity - 1, 1);
    setQuantity(newQuantity);
    setQuantityError("");
  };

  // 입력값 변경 처리
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // 빈 값이면 에러 제거
    if (value === "") {
      setQuantityError("");
      return;
    }

    // 유효성 검사
    const error = validateQuantity(value);
    setQuantityError(error);
  };

  // 입력값 확정 (Enter 또는 blur)
  const handleInputConfirm = () => {
    const numValue = parseInt(inputValue);

    if (isNaN(numValue)) {
      setInputValue(quantity.toString());
      setQuantityError("");
      return;
    }

    const error = validateQuantity(numValue);
    if (error) {
      setQuantityError(error);
      setInputValue(quantity.toString());
      return;
    }

    setQuantity(numValue);
    setQuantityError("");
  };

  // Enter 키 처리
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleInputConfirm();
    }
  };

  // 배송비 계산
  const getDeliveryFee = () => {
    if (!color || !size) return 0;

    const deliveryMethods = {
      standard: 0,
      express: 3000,
    };

    return deliveryMethods[deliveryMethod] || 0;
  };

  // 상품 가격 계산 (회원가 우선)
  const getProductPrice = () => {
    return memberPrice && memberPrice < price ? memberPrice : price;
  };

  // 총 상품 금액
  const totalProductPrice = getProductPrice() * quantity;

  // 배송비
  const deliveryFee = getDeliveryFee();

  // 총 결제 금액
  const totalAmount = totalProductPrice + deliveryFee;

  // 옵션 선택 완료 여부
  const isOptionsComplete = color && size;

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
        수량 및 합계
      </Typography>

      {/* 수량 선택 */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={handleDecrease}
            disabled={quantity <= 1}
            aria-label="수량 감소"
            size="small"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              "&:disabled": {
                borderColor: "grey.300",
              },
            }}
          >
            <Remove fontSize="small" />
          </IconButton>

          <TextField
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onKeyPress={handleKeyPress}
            size="small"
            sx={{
              width: 80,
              "& .MuiOutlinedInput-root": {
                textAlign: "center",
                "& input": {
                  textAlign: "center",
                  padding: "8px",
                },
              },
            }}
            inputProps={{
              min: 1,
              max: 999,
              step: 1,
              "aria-label": "수량 입력",
            }}
          />

          <IconButton
            onClick={handleIncrease}
            disabled={quantity >= 999}
            aria-label="수량 증가"
            size="small"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              "&:disabled": {
                borderColor: "grey.300",
              },
            }}
          >
            <Add fontSize="small" />
          </IconButton>
        </Box>

        {quantityError && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {quantityError}
          </Alert>
        )}
      </Box>

      {/* 가격 정보 */}
      <Box
        sx={{
          p: 2,
          backgroundColor: "grey.50",
          borderRadius: 1,
          opacity: isOptionsComplete ? 1 : 0.6,
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          결제 금액
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {/* 상품 가격 */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              상품 가격
            </Typography>
            <Typography variant="body2">
              {formatKRW(getProductPrice())} × {quantity}개
            </Typography>
          </Box>

          {/* 배송비 */}
          {deliveryFee > 0 && (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                배송비
              </Typography>
              <Typography variant="body2">{formatKRW(deliveryFee)}</Typography>
            </Box>
          )}

          {/* 구분선 */}
          <Box sx={{ borderTop: "1px solid", borderColor: "divider", my: 1 }} />

          {/* 총 결제 금액 */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              총 결제 금액
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
              {formatKRW(totalAmount)}
            </Typography>
          </Box>
        </Box>

        {/* 옵션 미선택 안내 */}
        {!isOptionsComplete && (
          <Alert severity="info" sx={{ mt: 2 }}>
            색상과 사이즈를 선택해주세요.
          </Alert>
        )}
      </Box>
    </Box>
  );
}
