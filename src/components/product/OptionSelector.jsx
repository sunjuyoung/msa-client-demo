import { useState } from "react";
import { Box, Typography, Button, Chip, Tooltip, Alert } from "@mui/material";
import { usePdpState } from "../../hooks/usePdpState";

export function OptionSelector({ product }) {
  const { colors = [], sizes = [] } = product;
  const { color, size, setColor, setSize } = usePdpState();

  const [colorError, setColorError] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const handleColorSelect = (selectedColor) => {
    setColor(selectedColor);
    setColorError(false);

    // 색상 변경 시 사이즈 초기화 (재고 확인 필요)
    if (size) {
      setSize(null);
      setSizeError(false);
    }
  };

  const handleSizeSelect = (selectedSize) => {
    if (!color) {
      setColorError(true);
      return;
    }

    setSize(selectedSize);
    setSizeError(false);
  };

  const getColorStock = (colorName) => {
    const colorData = colors.find((c) => c.name === colorName);
    return colorData?.stock || 0;
  };

  const getSizeStock = (sizeName) => {
    const sizeData = sizes.find((s) => s.name === sizeName);
    return sizeData?.stock || 0;
  };

  const isColorOutOfStock = (colorName) => {
    return getColorStock(colorName) === 0;
  };

  const isSizeOutOfStock = (sizeName) => {
    if (!color) return false;
    return getSizeStock(sizeName) === 0;
  };

  return (
    <Box>
      {/* 색상 선택 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          색상
          {color && (
            <Chip
              label={color}
              size="small"
              sx={{ ml: 1, backgroundColor: "primary.main", color: "white" }}
            />
          )}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {colors.map((colorOption) => {
            const isOutOfStock = isColorOutOfStock(colorOption.name);
            const isSelected = color === colorOption.name;

            return (
              <Tooltip
                key={colorOption.name}
                title={
                  isOutOfStock
                    ? "품절"
                    : `${colorOption.name} (재고: ${colorOption.stock}개)`
                }
                arrow
              >
                <span>
                  <Box
                    component="button"
                    type="button"
                    onClick={() =>
                      !isOutOfStock && handleColorSelect(colorOption.name)
                    }
                    disabled={isOutOfStock}
                    aria-pressed={isSelected}
                    aria-label={`${colorOption.name} 색상 선택`}
                    tabIndex={isOutOfStock ? -1 : 0}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: colorOption.code,
                      border: "2px solid",
                      borderColor: isSelected
                        ? "primary.main"
                        : isOutOfStock
                        ? "grey.300"
                        : "transparent",
                      cursor: isOutOfStock ? "not-allowed" : "pointer",
                      position: "relative",
                      opacity: isOutOfStock ? 0.5 : 1,
                      "&:hover": {
                        borderColor: isOutOfStock ? "grey.300" : "primary.light",
                      },
                      "&:focus": {
                        outline: `2px solid ${
                          isSelected ? "primary.main" : "grey.500"
                        }`,
                        outlineOffset: 2,
                      },
                    }}
                  >
                    {/* 품절 표시 */}
                    {isOutOfStock && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          width: 20,
                          height: 2,
                          backgroundColor: "grey.500",
                          transform: "translate(-50%, -50%) rotate(45deg)",
                        }}
                      />
                    )}

                    {/* 선택 표시 */}
                    {isSelected && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: -2,
                          right: -2,
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          border: "2px solid",
                          borderColor: "primary.main",
                          backgroundColor: "white",
                        }}
                      />
                    )}
                  </Box>
                </span>
              </Tooltip>
            );
          })}
        </Box>

        {colorError && (
          <Alert severity="error" sx={{ mt: 1 }}>
            색상을 먼저 선택해주세요.
          </Alert>
        )}
      </Box>

      {/* 사이즈 선택 */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          사이즈
          {size && (
            <Chip
              label={size}
              size="small"
              sx={{ ml: 1, backgroundColor: "primary.main", color: "white" }}
            />
          )}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {sizes.map((sizeOption) => {
            const isOutOfStock = isSizeOutOfStock(sizeOption.name);
            const isSelected = size === sizeOption.name;
            const isDisabled = !color || isOutOfStock;

            return (
              <Button
                key={sizeOption.name}
                variant={isSelected ? "contained" : "outlined"}
                disabled={isDisabled}
                onClick={() => handleSizeSelect(sizeOption.name)}
                aria-pressed={isSelected}
                aria-label={`${sizeOption.name} 사이즈 선택`}
                tabIndex={isDisabled ? -1 : 0}
                sx={{
                  minWidth: 60,
                  height: 40,
                  fontSize: "0.875rem",
                  fontWeight: isSelected ? 600 : 400,
                  borderColor: isOutOfStock ? "grey.300" : "primary.main",
                  color: isOutOfStock ? "grey.500" : undefined,
                  "&:hover": {
                    borderColor: isOutOfStock ? "grey.300" : "primary.light",
                  },
                  "&:focus": {
                    outline: `2px solid ${
                      isSelected ? "primary.main" : "grey.500"
                    }`,
                    outlineOffset: 2,
                  },
                }}
              >
                {sizeOption.name}
                {isOutOfStock && (
                  <Box
                    component="span"
                    sx={{
                      ml: 0.5,
                      fontSize: "0.75rem",
                      color: "grey.500",
                    }}
                  >
                    (품절)
                  </Box>
                )}
              </Button>
            );
          })}
        </Box>

        {sizeError && (
          <Alert severity="error" sx={{ mt: 1 }}>
            사이즈를 선택해주세요.
          </Alert>
        )}
      </Box>
    </Box>
  );
}
