import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import CouponIssueModal from "../components/common/CouponIssueModal";
import SummerCouponModal from "../components/common/SummerCouponModal";

const MainPage = () => {
  const navigate = useNavigate();

  // 실제 이미지 파일들
  const productImages = [
    "/images/products/girl-mb-data.jpg",
    "/images/products/mens-mb-data.jpg",
  ];

  // 랜덤으로 이미지 선택하는 함수
  const getRandomImage = () => {
    return productImages[Math.floor(Math.random() * productImages.length)];
  };

  const heroProducts = [
    {
      id: 1,
      name: "NEW ARRIVALS",
      description: "새로운 시즌의 트렌디한 아이템들을 만나보세요",
      image: getRandomImage(),
      cta: "바로가기",
      link: "/category",
    },
  ];

  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    setModalOpen(true);
  }, []);

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
      {/* SummerCouponModal 오버레이 모달 */}
      <SummerCouponModal open={modalOpen} onClose={() => setModalOpen(false)} />
      {/* Coupon Modal/Trigger 제거됨 */}
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
          py: 12,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: "neutral.800",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                }}
              >
                TBH SHOP
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: "neutral.600",
                  lineHeight: 1.4,
                }}
              >
                미니멀하고 트렌디한
                <br />
                패션을 경험하세요
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/category")}
                sx={{
                  backgroundColor: "neutral.900",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "neutral.800",
                  },
                }}
              >
                쇼핑 시작하기
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={getRandomImage()}
                  alt="TBH Collection"
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Quick Actions */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 6,
            fontWeight: 600,
            color: "neutral.800",
          }}
        >
          빠른 메뉴
        </Typography>
        <Grid container spacing={4}>
          {heroProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: "white",
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.2s ease-in-out",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "neutral.400",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  },
                }}
                onClick={() => navigate(product.link)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {product.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(product.link)}
                    sx={{
                      borderColor: "neutral.300",
                      color: "neutral.700",
                      "&:hover": {
                        borderColor: "neutral.600",
                        backgroundColor: "neutral.50",
                      },
                    }}
                  >
                    {product.cta}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MainPage;
