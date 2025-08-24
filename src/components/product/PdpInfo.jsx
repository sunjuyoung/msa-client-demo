import { Box, Typography, Chip, Divider } from "@mui/material";
import { PdpPriceBox } from "./PdpPriceBox";
import { OptionSelector } from "./OptionSelector";
import { DeliveryMethodToggle } from "./DeliveryMethodToggle";
import { QuantityAndTotal } from "./QuantityAndTotal";
import { PdpCtaBar } from "./PdpCtaBar";

export function PdpInfo({ product }) {
  const {
    name,
    brand,
    description,
    tags = [],
    isNew,
    isBest,
    freeShipping,
    freeReturn,
    deliveryTime,
    returnPeriod,
  } = product;

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* 상품 기본 정보 */}
      <Box sx={{ mb: 3 }}>
        {/* 브랜드 */}
        <Typography
          variant="body2"
          color="primary.main"
          sx={{ mb: 1, fontWeight: 600 }}
        >
          {brand}
        </Typography>

        {/* 상품명 */}
        <Typography
          variant="h4"
          sx={{ mb: 2, fontWeight: 600, lineHeight: 1.3 }}
        >
          {name}
        </Typography>

        {/* 태그들 */}
        <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
          {isNew && (
            <Chip
              label="NEW"
              size="small"
              sx={{
                backgroundColor: "neutral.900",
                color: "white",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            />
          )}
          {isBest && (
            <Chip
              label="BEST"
              size="small"
              sx={{
                backgroundColor: "warning.main",
                color: "white",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            />
          )}
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              variant="outlined"
              sx={{ fontSize: "0.75rem" }}
            />
          ))}
        </Box>

        {/* 상품 설명 */}
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, lineHeight: 1.6 }}
        >
          {description}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 가격 정보 */}
      <Box sx={{ mb: 3 }}>
        <PdpPriceBox product={product} />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 옵션 선택 */}
      <Box sx={{ mb: 3 }}>
        <OptionSelector product={product} />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 배송 방법 */}
      <Box sx={{ mb: 3 }}>
        <DeliveryMethodToggle />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 수량 및 합계 */}
      <Box sx={{ mb: 3 }}>
        <QuantityAndTotal product={product} />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 배송/반품 정보 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          배송 및 반품
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {freeShipping && (
            <Typography variant="body2" color="text.secondary">
              🚚 {deliveryTime} 배송 (무료)
            </Typography>
          )}
          {freeReturn && (
            <Typography variant="body2" color="text.secondary">
              🔄 {returnPeriod} 무료반품
            </Typography>
          )}
        </Box>
      </Box>

      {/* CTA 버튼들 */}
      <Box sx={{ mt: "auto", pt: 3 }}>
        <PdpCtaBar product={product} />
      </Box>
    </Box>
  );
}
