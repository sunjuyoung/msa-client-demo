import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  // 할인율 계산
  const discountRate =
    product.originalPrice && product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  // 색상 스와치 (최대 6개)
  const colorSwatches =
    product.colors?.slice(0, 6) || product.color?.slice(0, 6) || [];

  // 색상 매핑
  const getColorHex = (colorName) => {
    const colorMap = {
      black: "#000000",
      white: "#FFFFFF",
      navy: "#000080",
      gray: "#808080",
      beige: "#F5F5DC",
      red: "#FF0000",
      brown: "#8B4513",
      lightgray: "#D3D3D3",
      lightblue: "#ADD8E6",
      lightpurple: "#E6E6FA",
      offwhite: "#F5F5F5",
    };
    return colorMap[colorName] || "#CCCCCC";
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease",
        border: "1px solid",
        borderColor: "divider",
        width: "100%",
        maxWidth: "280px",
        minWidth: "250px",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {/* 썸네일 이미지 */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="320"
          image={product.image}
          alt={product.name}
          sx={{
            objectFit: "cover",
            backgroundColor: "neutral.50",
            width: "100%",
            maxWidth: "280px",
            minWidth: "250px",
          }}
        />

        {/* 리뷰 수 (우상단) */}
        {product.reviewCount && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "12px",
              px: 1.5,
              py: 0.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "neutral.700",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              리뷰 {product.reviewCount}
            </Typography>
          </Box>
        )}
      </Box>

      {/* 상품 정보 */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 2.5,
          gap: 1,
        }}
      >
        {/* 브랜드명 */}
        <Typography
          variant="body2"
          sx={{
            color: "neutral.600",
            fontSize: "0.875rem",
            fontWeight: 500,
            mb: 0.5,
          }}
        >
          {product.brand || "THE SHOP"}
        </Typography>

        {/* 상품명 (2줄 말줄임) */}
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: "neutral.900",
            lineHeight: 1.4,
            height: "2.8em", // 2줄 높이
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            mb: 0.5,
          }}
        >
          {product.name}
        </Typography>

        {/* 색상 스와치 */}
        {colorSwatches.length > 0 && (
          <Box
            sx={{
              display: "flex",
              gap: 0.75,
              mb: 1,
            }}
          >
            {colorSwatches.map((color, index) => (
              <Box
                key={index}
                sx={{
                  width: 24,
                  height: 24,
                  backgroundColor: getColorHex(color),
                  border:
                    index === 0 ? "2px solid #000000" : "2px solid #E0E0E0",
                  borderRadius: "50%",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.1)",
                    borderColor: "#000000",
                  },
                }}
              />
            ))}
          </Box>
        )}

        {/* 사이즈 정보 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "neutral.700",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            SIZE : {product.size?.join(", ") || "095~110"}
          </Typography>
          <IconButton
            size="small"
            sx={{
              color: "neutral.500",
              p: 0.5,
            }}
          >
            <KeyboardArrowDown size={16} />
          </IconButton>
        </Box>

        {/* 가격 정보 */}
        <Box sx={{ mt: "auto" }}>
          {discountRate > 0 ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {/* 할인가 */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "neutral.900",
                  fontSize: "1.25rem",
                }}
              >
                {product.price?.toLocaleString()}
              </Typography>

              {/* 원가 (취소선) */}
              <Typography
                variant="body2"
                sx={{
                  color: "neutral.500",
                  textDecoration: "line-through",
                  fontSize: "1rem",
                }}
              >
                {product.originalPrice?.toLocaleString()}
              </Typography>

              {/* 할인율 */}
              <Chip
                label={`${discountRate}%`}
                size="small"
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  height: "20px",
                }}
              />
            </Box>
          ) : (
            /* 정가만 표시 */
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "neutral.900",
                fontSize: "1.25rem",
              }}
            >
              {product.price?.toLocaleString()}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
