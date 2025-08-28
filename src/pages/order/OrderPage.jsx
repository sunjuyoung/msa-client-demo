import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Divider,
  Chip,
  Grid,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBack, Print } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { fetchUserCoupons } from "../../api/couponApi";
import { createOrder } from "../../api/orderApi";
import { useUser } from "../../shared/state/userStore";

export function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;
  const user = useUser();

  console.log(user.id);

  // 사용자 쿠폰 조회
  const {
    data: userCoupons = [],
    isLoading: isLoadingCoupons,
    error: couponsError,
  } = useQuery({
    queryKey: ["userCoupons", user?.id],
    queryFn: () => fetchUserCoupons(user?.id),
    enabled: !!user?.id, // 사용자가 로그인되어 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분간 캐시
  });

  // 주문 데이터가 없으면 기본값 사용
  const defaultOrderData = {
    product: {
      id: 1,
      name: "프리미엄 코튼 베이직 티셔츠",
      description:
        "프리미엄 코튼 소재로 제작된 베이직한 디자인의 티셔츠입니다.",
      brand: "TBH",
      image: "/images/products/girl-mb-data.jpg",
      originalPrice: 129000,
      price: 89000,
      category: "의류",
      subCategory: "티셔츠",
      options: {
        color: "블랙",
        size: "100",
      },
      tags: ["베이직", "코튼", "캐주얼"],
      isNew: true,
      isBest: false,
      freeShipping: true,
      freeReturn: true,
      deliveryTime: "1-2일",
      returnPeriod: "30일",
    },
    quantity: 1,
    deliveryMethod: "standard",
    shippingCost: 2500,
    totalPrice: 89000,
  };

  const order = orderData || defaultOrderData;
  const discount = order.product.originalPrice - order.product.price;
  const totalAmount = order.totalPrice || order.product.price * order.quantity;

  // 주문자 정보 상태
  const [ordererInfo, setOrdererInfo] = useState({
    name: "선주영",
    contact1: "01091648902",
    contact2: "010",
    email: "syseoz@naver.com",
  });

  // 배송지 정보 상태
  const [shippingInfo, setShippingInfo] = useState({
    recipient: "선주영",
    contact1: "01091648902",
    contact2: "010",
    address: "서울특별시 강남구 테헤란로 123",
    zipCode: "06130",
  });

  // 할인 혜택 상태
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedCouponData, setSelectedCouponData] = useState(null);

  // 최종 결제 금액 계산 (할인 금액이 변경될 때마다 재계산)
  const finalTotal = useMemo(() => {
    return totalAmount + order.shippingCost - discountAmount;
  }, [totalAmount, order.shippingCost, discountAmount]);

  const handleBackToCart = () => {
    navigate(-1);
  };

  // 주문자 정보 변경 핸들러
  const handleOrdererInfoChange = (e) => {
    const { name, value } = e.target;
    setOrdererInfo((prev) => ({ ...prev, [name]: value }));
  };

  // 배송지 정보 변경 핸들러
  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // 주문자 정보와 동일하게 설정
  const handleSameAsOrderer = () => {
    setShippingInfo({
      recipient: ordererInfo.name,
      contact1: ordererInfo.contact1,
      contact2: ordererInfo.contact2,
      address: shippingInfo.address,
      zipCode: shippingInfo.zipCode,
    });
  };

  // 쿠폰 선택
  const handleCouponChange = (event) => {
    const userCouponId = event.target.value;
    setSelectedCoupon(userCouponId);

    if (userCouponId) {
      // 선택된 쿠폰 데이터 찾기
      const couponData = userCoupons.find(
        (coupon) => coupon.userCouponId === parseInt(userCouponId)
      );

      if (couponData) {
        setSelectedCouponData(couponData);

        // 최소 주문 금액 확인
        if (totalAmount >= couponData.minOrderAmount) {
          setDiscountAmount(couponData.discountAmount);
        } else {
          setDiscountAmount(0);
          alert(
            `이 쿠폰은 ${couponData.minOrderAmount.toLocaleString()}원 이상 주문 시 사용 가능합니다.`
          );
        }
      }
    } else {
      setDiscountAmount(0);
      setSelectedCouponData(null);
    }
  };

  // 결제하기
  const handlePayment = async () => {
    try {
      // 색상 매핑 함수
      const mapColorToApi = (color) => {
        const colorMap = {
          블랙: "BLACK",
          화이트: "WHITE",
          네이비: "NAVY",
          그레이: "GRAY",
          블루: "BLUE",
          레드: "RED",
          베이지: "BEIGE",
        };
        return colorMap[color] || "BLACK";
      };

      // 사이즈 매핑 함수
      const mapSizeToApi = (size) => {
        const sizeMap = {
          XS: 85,
          S: 90,
          M: 95,
          L: 100,
          XL: 105,
          XXL: 110,
        };
        return sizeMap[size] || 95;
      };

      // 주문 데이터 준비
      const orderRequestData = {
        productId: order.product.id,
        productCount: order.quantity,
        userId: user?.id || 1,
        totalPrice: finalTotal,
        color: mapColorToApi(order.product.options.color),
        size: mapSizeToApi(order.product.options.size),
      };

      console.log("주문 요청 데이터:", orderRequestData);

      // API 요청 보내기
      const response = await createOrder(orderRequestData);

      console.log("주문 응답 데이터:", response);

      // 응답 데이터를 URL 파라미터로 전달하여 위젯 체크아웃 페이지로 이동
      navigate(
        `/widget/checkout?data=${encodeURIComponent(
          JSON.stringify(response.data)
        )}`
      );
    } catch (error) {
      console.error("주문 생성 실패:", error);
      alert("주문 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (!order) {
    return (
      <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Typography variant="h5" color="error" sx={{ textAlign: "center" }}>
            주문 정보를 찾을 수 없습니다.
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* 페이지 제목 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            주문서작성 / 결제
          </Typography>
          <Typography variant="h6" color="text.secondary">
            주문 상세 내역
          </Typography>
        </Box>

        {/* 주문 상품 테이블 */}
        <Paper sx={{ mb: 4, overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "grey.50" }}>
                  <TableCell sx={{ fontWeight: 600, minWidth: 300 }}>
                    상품정보
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 600, minWidth: 80 }}
                  >
                    수량
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 600, minWidth: 120 }}
                  >
                    상품금액
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 600, minWidth: 150 }}
                  >
                    할인/적립
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 600, minWidth: 100 }}
                  >
                    판매자
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 600, minWidth: 120 }}
                  >
                    합계금액
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 600, minWidth: 100 }}
                  >
                    배송비
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 600, minWidth: 120 }}
                  >
                    배송방법
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {/* 상품정보 */}
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box
                        component="img"
                        src={order.product.image}
                        alt={order.product.name}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 1,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      />
                      <Box>
                        <Typography
                          variant="body2"
                          color="primary"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          {order.product.brand}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 500, mb: 1 }}
                        >
                          {order.product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          옵션: 컬러:{order.product.options.color} / 사이즈:
                          {order.product.options.size}
                        </Typography>

                        {/* 상품 설명 */}
                        {order.product.description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mt: 1,
                              lineHeight: 1.4,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {order.product.description}
                          </Typography>
                        )}

                        {/* 태그들 */}
                        {order.product.tags &&
                          order.product.tags.length > 0 && (
                            <Box
                              sx={{
                                display: "flex",
                                gap: 0.5,
                                mt: 1,
                                flexWrap: "wrap",
                              }}
                            >
                              {order.product.tags
                                .slice(0, 3)
                                .map((tag, index) => (
                                  <Chip
                                    key={index}
                                    label={tag}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      fontSize: "0.7rem",
                                      height: 20,
                                      "& .MuiChip-label": { px: 1 },
                                    }}
                                  />
                                ))}
                            </Box>
                          )}

                        {/* 상품 배지 */}
                        <Box sx={{ display: "flex", gap: 0.5, mt: 1 }}>
                          {order.product.isNew && (
                            <Chip
                              label="NEW"
                              size="small"
                              sx={{
                                backgroundColor: "neutral.900",
                                color: "white",
                                fontSize: "0.7rem",
                                height: 20,
                                "& .MuiChip-label": { px: 1 },
                              }}
                            />
                          )}
                          {order.product.isBest && (
                            <Chip
                              label="BEST"
                              size="small"
                              sx={{
                                backgroundColor: "warning.main",
                                color: "white",
                                fontSize: "0.7rem",
                                height: 20,
                                "& .MuiChip-label": { px: 1 },
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* 수량 */}
                  <TableCell align="center">
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {order.quantity}개
                    </Typography>
                  </TableCell>

                  {/* 상품금액 */}
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {discount > 0 && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textDecoration: "line-through", mb: 0.5 }}
                        >
                          {order.product.originalPrice.toLocaleString()}원
                        </Typography>
                      )}
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, color: "primary.main" }}
                      >
                        {order.product.price.toLocaleString()}원
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* 할인/적립 */}
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      {discount > 0 && (
                        <Chip
                          label={`할인 ${discount.toLocaleString()}원`}
                          size="small"
                          color="error"
                          variant="outlined"
                        />
                      )}
                      <Chip
                        label={`적립 +${Math.floor(
                          order.product.price * 0.01
                        ).toLocaleString()}원`}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    </Box>
                  </TableCell>

                  {/* 판매자 */}
                  <TableCell align="center">
                    <Typography variant="body2" color="text.secondary">
                      본사
                    </Typography>
                  </TableCell>

                  {/* 합계금액 */}
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, color: "primary.main" }}
                    >
                      {totalAmount.toLocaleString()}원
                    </Typography>
                  </TableCell>

                  {/* 배송비 */}
                  <TableCell align="center">
                    <Typography variant="body2" color="text.secondary">
                      {order.shippingCost === 0
                        ? "무료"
                        : `${order.shippingCost.toLocaleString()}원`}
                    </Typography>
                  </TableCell>

                  {/* 배송방법 */}
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      <Typography variant="body2" fontWeight={500}>
                        {order.deliveryMethod === "express"
                          ? "빠른배송"
                          : "일반배송"}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize="0.75rem"
                      >
                        {order.deliveryMethod === "express"
                          ? "당일~1일"
                          : order.product.deliveryTime || "1-2일"}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* 하단 버튼 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 20,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleBackToCart}
            sx={{ minWidth: 150 }}
          >
            장바구니 돌아가기
          </Button>
        </Box>

        {/* 2단 레이아웃: 주문자/배송지 정보 + 결제 정보 */}
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* 좌측: 주문자 정보 및 배송지 정보 (2/3 비율) */}
          <Box sx={{ flex: 2 }}>
            {/* 주문자 정보 */}
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                주문자 정보
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="주문자"
                    name="name"
                    value={ordererInfo.name}
                    onChange={handleOrdererInfoChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="연락처1"
                    name="contact1"
                    value={ordererInfo.contact1}
                    onChange={handleOrdererInfoChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="연락처2"
                    name="contact2"
                    value={ordererInfo.contact2}
                    onChange={handleOrdererInfoChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="이메일"
                    name="email"
                    value={ordererInfo.email}
                    onChange={handleOrdererInfoChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* 배송지 정보 */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">배송지 정보</Typography>
                <Box>
                  <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                    배송지 목록
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleSameAsOrderer}
                  >
                    주문고객 정보와 동일
                  </Button>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="받으시는 분"
                    name="recipient"
                    value={shippingInfo.recipient}
                    onChange={handleShippingInfoChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="연락처1"
                    name="contact1"
                    value={shippingInfo.contact1}
                    onChange={handleShippingInfoChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="연락처2"
                    name="contact2"
                    value={shippingInfo.contact2}
                    onChange={handleShippingInfoChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="우편번호"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleShippingInfoChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="주소"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingInfoChange}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* 할인 혜택 */}
            <Paper elevation={1} sx={{ p: 3, mt: 10, mb: 40 }}>
              <Typography variant="h6" gutterBottom>
                할인 혜택
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {!user ? (
                <Alert severity="info" sx={{ mb: 2 }}>
                  쿠폰을 사용하려면 로그인이 필요합니다.
                </Alert>
              ) : (
                <Grid container spacing={2}>
                  {/* 쿠폰 선택 */}
                  <Grid item xs={12}>
                    {isLoadingCoupons ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          py: 2,
                        }}
                      >
                        <CircularProgress size={24} />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          쿠폰을 불러오는 중...
                        </Typography>
                      </Box>
                    ) : couponsError ? (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        쿠폰 조회에 실패했습니다: {couponsError.message}
                      </Alert>
                    ) : userCoupons.length === 0 ? (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        사용 가능한 쿠폰이 없습니다.
                      </Alert>
                    ) : (
                      <TextField
                        select
                        fullWidth
                        label="쿠폰 선택"
                        value={selectedCoupon}
                        onChange={handleCouponChange}
                        variant="outlined"
                        size="small"
                        placeholder="쿠폰을 선택하세요"
                        sx={{
                          "& .MuiSelect-select": {
                            fontSize: "1rem",
                            padding: "10px 16px 1px 16px",
                            minHeight: "48px",
                            color: "text.primary",
                            minWidth: "200px",
                          },
                          "& .MuiMenuItem-root": {
                            fontSize: "1rem",
                            padding: "10px 16px 5px 16px",
                            minHeight: "48px",
                            whiteSpace: "normal",
                            lineHeight: 1.4,
                          },
                          "& .MuiInputLabel-root": {
                            fontSize: "1rem",
                            color: "text.secondary",
                          },
                          "& .MuiSelect-select.MuiSelect-select": {
                            width: "100%",
                          },
                        }}
                      >
                        <MenuItem
                          value=""
                          sx={{
                            color: "text.secondary",
                            fontStyle: "italic",
                            minWidth: "200px",
                            width: "100%",
                          }}
                        >
                          쿠폰을 선택하세요
                        </MenuItem>
                        {userCoupons.map((coupon) => (
                          <MenuItem
                            key={coupon.userCouponId}
                            value={coupon.userCouponId}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: 0.5,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <Typography variant="body1" fontWeight={500}>
                                {coupon.couponName}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="error.main"
                                fontWeight={600}
                              >
                                -{coupon.discountAmount.toLocaleString()}원
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              fontSize="0.8rem"
                            >
                              최소 주문 금액:{" "}
                              {coupon.minOrderAmount.toLocaleString()}원
                            </Typography>
                            <Typography
                              variant="body2"
                              color="primary.main"
                              fontSize="0.8rem"
                            >
                              코드: {coupon.code}
                            </Typography>
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </Grid>

                  {/* 할인 금액 표시 */}
                  {discountAmount > 0 && selectedCouponData && (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: "grey.50",
                          borderRadius: 1,
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          color="error.main"
                          fontWeight={600}
                          gutterBottom
                        >
                          -{discountAmount.toLocaleString()}원 할인
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedCouponData.couponName} (
                          {selectedCouponData.code})
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}
            </Paper>
          </Box>

          {/* 우측: 결제 금액 정보 및 결제하기 버튼 (1/3 비율) */}
          <Box sx={{ flex: 1 }}>
            <Paper elevation={1} sx={{ p: 3, position: "sticky", top: 20 }}>
              <Typography variant="h6" gutterBottom>
                결제 금액 정보
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {/* 배송 정보 */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    backgroundColor: "primary.50",
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    color="primary.main"
                    fontWeight={500}
                  >
                    배송 방법
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {order.deliveryMethod === "express"
                      ? "빠른배송"
                      : "일반배송"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    backgroundColor: "primary.50",
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    color="primary.main"
                    fontWeight={500}
                  >
                    예상 배송 시간
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {order.deliveryMethod === "express"
                      ? "당일~1일"
                      : order.product.deliveryTime || "1-2일"}
                  </Typography>
                </Box>
              </Box>

              {/* 상품 금액 정보 */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    backgroundColor: "grey.50",
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    총 {order.quantity}개의 상품 금액
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {totalAmount.toLocaleString()}원
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    backgroundColor: "grey.50",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    배송비
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    (+) {order.shippingCost.toLocaleString()}원
                  </Typography>
                </Box>
                {discountAmount > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2,
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      할인
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      color="error.main"
                    >
                      (-) {discountAmount.toLocaleString()}원
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* 결제 예정 금액 */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 3,
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: 2,
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ color: "white" }}>
                  결제 예정 금액
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "white" }}
                  fontWeight="bold"
                >
                  {finalTotal.toLocaleString()}원
                </Typography>
              </Box>

              {/* 적립 예상 마일리지 */}
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  backgroundColor: "grey.50",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  적립 예상 마일리지:{" "}
                  {Math.floor(totalAmount * 0.01).toLocaleString()}원
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  상품: {Math.floor(totalAmount * 0.005).toLocaleString()}원
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  회원 등급 추가:{" "}
                  {Math.floor(totalAmount * 0.005).toLocaleString()}원
                </Typography>
              </Box>

              {/* 결제하기 버튼 */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ py: 1.5, fontSize: "1.1rem", fontWeight: 600 }}
                onClick={handlePayment}
              >
                {finalTotal.toLocaleString()}원 결제하기
              </Button>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
