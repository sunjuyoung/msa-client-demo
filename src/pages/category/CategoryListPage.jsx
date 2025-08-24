import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { ArrowLeft } from "lucide-react";
import ProductCard from "../../features/product/components/ProductCard";

const CategoryListPage = () => {
  const navigate = useNavigate();

  // 임시 카테고리 데이터
  const categories = [
    {
      id: 1,
      name: "여성 의류",
      description: "여성 전용 의류 컬렉션",
      image: "/images/products/girl-mb-data.jpg",
      productCount: 24,
    },
    {
      id: 2,
      name: "남성 의류",
      description: "남성 전용 의류 컬렉션",
      image: "/images/products/mens-mb-data.jpg",
      productCount: 18,
    },
    {
      id: 3,
      name: "액세서리",
      description: "패션 액세서리 컬렉션",
      image: "/images/products/girl-mb-data.jpg",
      productCount: 12,
    },
  ];

  // 임시 상품 데이터
  const products = [
    {
      id: 1,
      name: "여름 원피스",
      description: "시원하고 트렌디한 여름 원피스",
      image: "/images/products/girl-mb-data.jpg",
      price: "₩89,000",
    },
    {
      id: 2,
      name: "데님 팬츠",
      description: "클래식한 데님 팬츠",
      image: "/images/products/mens-mb-data.jpg",
      price: "₩129,000",
    },
    {
      id: 3,
      name: "니트 스웨터",
      description: "부드럽고 따뜻한 니트 스웨터",
      image: "/images/products/girl-mb-data.jpg",
      price: "₩159,000",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
          py: 6,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Button
              startIcon={<ArrowLeft />}
              onClick={() => navigate(-1)}
              sx={{ mr: 2 }}
            >
              뒤로가기
            </Button>
            <Typography variant="h3" sx={{ fontWeight: 700, color: "neutral.800" }}>
              카테고리
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ color: "neutral.600" }}>
            다양한 카테고리에서 원하는 상품을 찾아보세요
          </Typography>
        </Container>
      </Box>

      {/* Categories */}
      <Container maxWidth="lg" sx={{ py: 8, px: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant="h4" sx={{ mb: 6, fontWeight: 600, color: "neutral.800" }}>
          카테고리별 상품
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {categories.map((category) => (
            <Grid
              key={category.id}
              xs={12}
              sm={6}
              md={4}
            >
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                }}
                onClick={() => navigate(`/category/${category.id}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={category.image}
                  alt={category.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {category.description}
                  </Typography>
                  <Typography variant="caption" color="primary">
                    {category.productCount}개 상품
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Featured Products */}
        <Typography variant="h4" sx={{ mb: 6, fontWeight: 600, color: "neutral.800" }}>
          인기 상품
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid
              key={product.id}
              xs={12}
              sm={6}
              md={4}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CategoryListPage;
