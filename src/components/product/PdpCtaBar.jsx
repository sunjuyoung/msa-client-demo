import { useState } from "react";
import {
  Box,
  Button,
  Alert,
  Snackbar,
  Fab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ShoppingCart,
  FlashOn,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { usePdpState } from "../../hooks/usePdpState";
import { useAddToCart } from "../../hooks/useAddToCart";

export function PdpCtaBar({ product }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { color, size, quantity, deliveryMethod } = usePdpState();
  const { mutate: addToCart, isLoading: isAddingToCart } = useAddToCart();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  // 옵션 선택 완료 여부
  const isOptionsComplete = color && size;

  // 장바구니 추가
  const handleAddToCart = () => {
    if (!isOptionsComplete) {
      setErrorMessage("색상과 사이즈를 선택해주세요.");
      setShowError(true);
      return;
    }

    const lineItem = {
      productId: product.id,
      color,
      size,
      quantity,
      deliveryMethod,
    };

    addToCart(lineItem, {
      onSuccess: () => {
        setShowSuccess(true);
      },
      onError: (error) => {
        setErrorMessage(error.message || "장바구니 추가에 실패했습니다.");
        setShowError(true);
      },
    });
  };

  // 바로구매
  const handleBuyNow = () => {
    if (!isOptionsComplete) {
      setErrorMessage("색상과 사이즈를 선택해주세요.");
      setShowError(true);
      return;
    }

    // 장바구니에 추가 후 바로구매 페이지로 이동
    const lineItem = {
      productId: product.id,
      color,
      size,
      quantity,
      deliveryMethod,
    };

    addToCart(lineItem, {
      onSuccess: () => {
        // 바로구매 페이지로 이동
        // navigate('/checkout', { state: { buyNow: true } });
        console.log("바로구매 페이지로 이동");
      },
      onError: (error) => {
        setErrorMessage(error.message || "바로구매에 실패했습니다.");
        setShowError(true);
      },
    });
  };

  // 위시리스트 토글
  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: 위시리스트 API 호출
  };

  // 데스크톱 버전
  if (!isMobile) {
    return (
      <>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* 위시리스트 버튼 */}
          <Button
            variant="outlined"
            startIcon={isWishlisted ? <Favorite /> : <FavoriteBorder />}
            onClick={handleWishlistToggle}
            disabled={!isOptionsComplete}
            sx={{
              flex: 1,
              py: 2,
              borderColor: isWishlisted ? "error.main" : "primary.main",
              color: isWishlisted ? "error.main" : "primary.main",
              "&:hover": {
                borderColor: isWishlisted ? "error.dark" : "primary.dark",
                backgroundColor: isWishlisted ? "error.50" : "primary.50",
              },
            }}
          >
            {isWishlisted ? "위시리스트" : "위시리스트"}
          </Button>

          {/* 장바구니 버튼 */}
          <Button
            variant="outlined"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            disabled={!isOptionsComplete || isAddingToCart}
            loading={isAddingToCart}
            sx={{
              flex: 2,
              py: 2,
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": {
                borderColor: "primary.dark",
                backgroundColor: "primary.50",
              },
            }}
          >
            {isAddingToCart ? "추가 중..." : "장바구니"}
          </Button>

          {/* 바로구매 버튼 */}
          <Button
            variant="contained"
            startIcon={<FlashOn />}
            onClick={handleBuyNow}
            disabled={!isOptionsComplete || isAddingToCart}
            sx={{
              flex: 2,
              py: 2,
              backgroundColor: "error.main",
              "&:hover": {
                backgroundColor: "error.dark",
              },
            }}
          >
            바로구매
          </Button>
        </Box>

        {/* 성공/에러 알림 */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" onClose={() => setShowSuccess(false)}>
            장바구니에 추가되었습니다.
          </Alert>
        </Snackbar>

        <Snackbar
          open={showError}
          autoHideDuration={4000}
          onClose={() => setShowError(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error" onClose={() => setShowError(false)}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </>
    );
  }

  // 모바일 버전 (Sticky 하단)
  return (
    <>
      {/* Floating Action Button for 모바일 */}
      <Fab
        variant="extended"
        color="primary"
        onClick={handleBuyNow}
        disabled={!isOptionsComplete || isAddingToCart}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
          px: 3,
          py: 1.5,
          backgroundColor: "error.main",
          "&:hover": {
            backgroundColor: "error.dark",
          },
        }}
      >
        <FlashOn sx={{ mr: 1 }} />
        바로구매
      </Fab>

      {/* 하단 고정 CTA 바 */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          borderTop: "1px solid",
          borderColor: "divider",
          p: 2,
          zIndex: 999,
          display: "flex",
          gap: 1,
        }}
      >
        {/* 위시리스트 */}
        <Button
          variant="outlined"
          onClick={handleWishlistToggle}
          disabled={!isOptionsComplete}
          sx={{
            minWidth: "auto",
            px: 2,
            borderColor: isWishlisted ? "error.main" : "primary.main",
            color: isWishlisted ? "error.main" : "primary.main",
          }}
        >
          {isWishlisted ? <Favorite /> : <FavoriteBorder />}
        </Button>

        {/* 장바구니 */}
        <Button
          variant="outlined"
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          disabled={!isOptionsComplete || isAddingToCart}
          sx={{
            flex: 1,
            py: 1.5,
            borderColor: "primary.main",
            color: "primary.main",
          }}
        >
          {isAddingToCart ? "추가 중..." : "장바구니"}
        </Button>

        {/* 바로구매 */}
        <Button
          variant="contained"
          startIcon={<FlashOn />}
          onClick={handleBuyNow}
          disabled={!isOptionsComplete || isAddingToCart}
          sx={{
            flex: 1,
            py: 1.5,
            backgroundColor: "error.main",
            "&:hover": {
              backgroundColor: "error.dark",
            },
          }}
        >
          바로구매
        </Button>
      </Box>

      {/* 하단 여백 (모바일에서 CTA 바 높이만큼) */}
      <Box sx={{ height: 80 }} />

      {/* 성공/에러 알림 */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          장바구니에 추가되었습니다.
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setShowError(false)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
