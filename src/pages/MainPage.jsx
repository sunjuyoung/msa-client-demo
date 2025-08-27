import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import SummerCouponModal from "../components/common/SummerCouponModal";
import ProductCard from "../features/product/components/ProductCard";
import { useUser } from "../shared/state/userStore";

const MainPage = () => {
  const navigate = useNavigate();
  const user = useUser();

  // 이미지를 girl-mb-data.jpg로 고정
  const getFixedImage = () => {
    return "/images/products/girl-mb-data.jpg";
  };

  const heroProducts = [
    {
      id: 1,
      name: "NEW ARRIVALS",
      description: "새로운 시즌의 트렌디한 아이템들을 만나보세요",
      image: getFixedImage(),
      cta: "바로가기",
      link: "/category",
    },
  ];

  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    // 사용자가 로그인되어 있을 때만 모달 자동 열기
    if (user) {
      setModalOpen(true);
    }
  }, [user]);

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
      {/* SummerCouponModal 오버레이 모달 */}
      <SummerCouponModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
          py: 12,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid sx={{ flex: { xs: "1 1 100%", md: "1 1 50%" } }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: "neutral.800",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                }}
              >
                THE SHOP
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
                onClick={() => navigate("/products")}
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
            <Grid sx={{ flex: { xs: "1 1 100%", md: "1 1 50%" } }}>
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={getFixedImage()}
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
      <Container maxWidth="lg" sx={{ py: 8, px: { xs: 2, sm: 3, md: 4 } }}>
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
            <Grid
              key={product.id}
              sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(50% - 16px)",
                  md: "1 1 calc(33.333% - 16px)",
                },
              }}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MainPage;
