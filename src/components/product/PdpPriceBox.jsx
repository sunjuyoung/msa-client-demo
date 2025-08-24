import { Box, Typography, Chip } from "@mui/material";

// KRW 포맷터 함수
const formatKRW = (amount) => {
  if (typeof amount !== "number") return "0원";

  // 반올림 처리
  const rounded = Math.round(amount);

  // 천 단위 콤마 추가
  return rounded.toLocaleString("ko-KR") + "원";
};

// 할인율 계산 함수
const calculateDiscountRate = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice || originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

export function PdpPriceBox({ product }) {
  const { price, originalPrice, discount, memberPrice } = product;

  // 할인율이 명시되지 않은 경우 계산
  const actualDiscount =
    discount || calculateDiscountRate(originalPrice, price);
  const hasDiscount = actualDiscount > 0;
  const hasMemberPrice = memberPrice && memberPrice < price;

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
        가격
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {/* 할인율 */}
        {hasDiscount && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={`${actualDiscount}% 할인`}
              size="small"
              sx={{
                backgroundColor: "error.main",
                color: "white",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            />
          </Box>
        )}

        {/* 판매가 */}
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: hasDiscount ? "error.main" : "text.primary",
            }}
          >
            {formatKRW(price)}
          </Typography>

          {/* 정가 (할인이 있는 경우) */}
          {hasDiscount && originalPrice && (
            <Typography
              variant="h6"
              sx={{
                textDecoration: "line-through",
                color: "text.secondary",
                fontWeight: 400,
              }}
            >
              {formatKRW(originalPrice)}
            </Typography>
          )}
        </Box>

        {/* 회원가 */}
        {hasMemberPrice && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
              회원가 {formatKRW(memberPrice)}
            </Typography>
            <Chip
              label="회원혜택"
              size="small"
              variant="outlined"
              sx={{
                borderColor: "primary.main",
                color: "primary.main",
                fontSize: "0.75rem",
              }}
            />
          </Box>
        )}

        {/* 할인 금액 */}
        {hasDiscount && originalPrice && (
          <Typography
            variant="body2"
            color="success.main"
            sx={{ fontWeight: 600 }}
          >
            {formatKRW(originalPrice - price)} 절약
          </Typography>
        )}
      </Box>
    </Box>
  );
}
