import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Slider,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Skeleton,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { X, Grid3X3, Grid, List } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../features/product/components/ProductCard";

const ProductListPage = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [viewDensity, setViewDensity] = useState("default");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedBenefits, setSelectedBenefits] = useState([]);

  // API 호출 함수
  const fetchProductList = async () => {
    const response = await fetch(
      "http://localhost:8080/product-service/product"
    );

    if (!response.ok) {
      throw new Error("상품 목록을 불러오는데 실패했습니다.");
    }

    const data = await response.json();

    // API 데이터를 UI에 맞게 변환
    return data.content.map((product) => ({
      id: product.productId,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: Math.round(product.price / 0.9), // 10% 할인율 적용
      category: product.category,
      size: product.size,
      color: product.color,
      image: "/images/products/girl-mb-data.jpg", // 기본 이미지
      isNew: Math.random() > 0.7, // 30% 확률로 신상품
      popularity: Math.floor(Math.random() * 30) + 70, // 70-100 랜덤값
      discountRate: 10, // 10% 고정
    }));
  };

  // React Query로 상품 목록 조회
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductList,
  });

  // 카테고리 데이터
  const categories = [
    { id: 1, name: "여성 의류", count: 24 },
    { id: 2, name: "남성 의류", count: 18 },
    { id: 3, name: "액세서리", count: 12 },
    { id: 4, name: "신발", count: 15 },
    { id: 5, name: "가방", count: 8 },
  ];

  // 사이즈 데이터
  const sizes = [
    { id: "XS", name: "XS", count: 15 },
    { id: "S", name: "S", count: 28 },
    { id: "M", name: "M", count: 32 },
    { id: "L", name: "L", count: 25 },
    { id: "XL", name: "XL", count: 18 },
    { id: "XXL", name: "XXL", count: 12 },
  ];

  // 색상 데이터
  const colors = [
    { id: "black", name: "블랙", count: 22, hex: "#000000" },
    { id: "white", name: "화이트", count: 19, hex: "#FFFFFF" },
    { id: "navy", name: "네이비", count: 15, hex: "#000080" },
    { id: "gray", name: "그레이", count: 18, hex: "#808080" },
    { id: "beige", name: "베이지", count: 12, hex: "#F5F5DC" },
    { id: "red", name: "레드", count: 8, hex: "#FF0000" },
  ];

  // 혜택 데이터는 API 데이터에 해당 필드가 없어서 제거됨

  // 상품 데이터

  // 다중 선택 처리 함수들
  const handleMultiSelect = (selectedItems, setSelectedItems, itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // 가격 범위 처리
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // 필터 초기화
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 500000]);
    setSelectedBenefits([]);
  };

  // 선택된 필터 요약
  const getSelectedFiltersSummary = () => {
    const summary = [];
    if (selectedCategories.length > 0) {
      summary.push(`카테고리 ${selectedCategories.length}개`);
    }
    if (selectedSizes.length > 0) {
      summary.push(`사이즈 ${selectedSizes.length}개`);
    }
    if (selectedColors.length > 0) {
      summary.push(`색상 ${selectedColors.length}개`);
    }
    if (selectedBenefits.length > 0) {
      summary.push(`혜택 ${selectedBenefits.length}개`);
    }
    if (priceRange[0] > 0 || priceRange[1] < 500000) {
      summary.push(
        `가격 ${priceRange[0].toLocaleString()}~${priceRange[1].toLocaleString()}`
      );
    }
    return summary;
  };

  // 필터링된 상품 목록
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(
        categories.find((cat) => cat.name === product.category)?.id
      );
    const sizeMatch =
      selectedSizes.length === 0 ||
      product.size.some((size) => selectedSizes.includes(size));
    const colorMatch =
      selectedColors.length === 0 ||
      product.color.some((color) => selectedColors.includes(color));
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return categoryMatch && sizeMatch && colorMatch && priceMatch;
  });

  // 정렬된 상품 목록
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.isNew - a.isNew;
      case "popularity":
        return b.popularity - a.popularity;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "discount":
        return b.discountRate - a.discountRate;
      default:
        return 0;
    }
  });

  // 뷰 밀도에 따른 그리드 설정
  const getGridSettings = () => {
    switch (viewDensity) {
      case "compact":
        return {
          xs: "1fr",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
          xl: "repeat(6, 1fr)",
        };
      case "default":
        return {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        };
      case "spacious":
        return {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        };
      default:
        return {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        };
    }
  };

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
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 2, md: 2 } }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: "neutral.800", mb: 2 }}
          >
            상품 목록
          </Typography>
          <Typography variant="h6" sx={{ color: "neutral.600" }}>
            다양한 상품을 찾아보세요
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 6, px: { xs: 2, sm: 2, md: 2 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* 좌측 필터 */}
          <Box
            sx={{
              width: { xs: "100%", md: "320px" },
              flexShrink: 0,
            }}
          >
            {/* 선택된 필터 요약 */}
            {getSelectedFiltersSummary().length > 0 && (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  backgroundColor: "neutral.50",
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    선택된 필터
                  </Typography>
                  <Button
                    size="small"
                    onClick={handleResetFilters}
                    startIcon={<X size={16} />}
                    sx={{ minWidth: "auto", p: 0.5 }}
                  >
                    초기화
                  </Button>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {getSelectedFiltersSummary().map((summary, index) => (
                    <Chip
                      key={index}
                      label={summary}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "0.75rem" }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* 필터 아코디언 */}
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                overflow: "hidden",
              }}
            >
              {/* 카테고리 */}
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "none" }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    카테고리
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {categories.map((category) => (
                      <FormControlLabel
                        key={category.id}
                        control={
                          <Checkbox
                            checked={selectedCategories.includes(category.id)}
                            onChange={() =>
                              handleMultiSelect(
                                selectedCategories,
                                setSelectedCategories,
                                category.id
                              )
                            }
                          />
                        }
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <span>{category.name}</span>
                            <Chip label={category.count} size="small" />
                          </Box>
                        }
                        sx={{ width: "100%", mb: 1 }}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>

              <Divider />

              {/* 사이즈 */}
              <Accordion disableGutters sx={{ boxShadow: "none" }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    사이즈
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {sizes.map((size) => (
                      <FormControlLabel
                        key={size.id}
                        control={
                          <Checkbox
                            checked={selectedSizes.includes(size.id)}
                            onChange={() =>
                              handleMultiSelect(
                                selectedSizes,
                                setSelectedSizes,
                                size.id
                              )
                            }
                          />
                        }
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <span>{size.name}</span>
                            <Chip label={size.count} size="small" />
                          </Box>
                        }
                        sx={{ width: "100%", mb: 1 }}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>

              <Divider />

              {/* 색상 */}
              <Accordion disableGutters sx={{ boxShadow: "none" }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    색상
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {colors.map((color) => (
                      <FormControlLabel
                        key={color.id}
                        control={
                          <Checkbox
                            checked={selectedColors.includes(color.id)}
                            onChange={() =>
                              handleMultiSelect(
                                selectedColors,
                                setSelectedColors,
                                color.id
                              )
                            }
                          />
                        }
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "50%",
                                  backgroundColor: color.hex,
                                  border: "1px solid",
                                  borderColor:
                                    color.hex === "#FFFFFF"
                                      ? "divider"
                                      : "transparent",
                                }}
                              />
                              <span>{color.name}</span>
                            </Box>
                            <Chip label={color.count} size="small" />
                          </Box>
                        }
                        sx={{ width: "100%", mb: 1 }}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>

              <Divider />

              {/* 가격 범위 */}
              <Accordion disableGutters sx={{ boxShadow: "none" }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    가격 범위
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ px: 1 }}>
                    <Slider
                      value={priceRange}
                      onChange={handlePriceChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={500000}
                      step={10000}
                      valueLabelFormat={(value) => `₩${value.toLocaleString()}`}
                      sx={{ mb: 2 }}
                    />
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        ₩{priceRange[0].toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₩{priceRange[1].toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* 혜택 필터는 API 데이터에 해당 필드가 없어서 제거됨 */}
            </Box>
          </Box>

          {/* 우측 상품 목록 */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            {/* 정렬 옵션 */}
            <Box
              sx={{
                mb: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: { xs: "wrap", sm: "nowrap" },
                gap: 2,
              }}
            >
              {/* 결과 개수 및 정렬 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  총 {sortedProducts.length}개 상품
                </Typography>

                {/* 탭형 정렬 컨트롤 */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mr: 2 }}
                  >
                    정렬:
                  </Typography>
                  <ToggleButtonGroup
                    value={sortBy}
                    exclusive
                    onChange={(event, newValue) => {
                      if (newValue !== null) {
                        setSortBy(newValue);
                      }
                    }}
                    size="small"
                    sx={{
                      "& .MuiToggleButton-root": {
                        px: 2,
                        py: 0.5,
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        border: "none",
                        color: "neutral.600",
                        backgroundColor: "transparent",
                        "&.Mui-selected": {
                          backgroundColor: "transparent",
                          color: "neutral.900",
                          fontWeight: 700,
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        },
                        "&:hover": {
                          backgroundColor: "neutral.50",
                        },
                        "&:not(:last-child)": {
                          borderRight: "none",
                        },
                      },
                    }}
                  >
                    <ToggleButton value="newest">신상품순</ToggleButton>
                    <ToggleButton value="popularity">인기순</ToggleButton>
                    <ToggleButton value="price-low">낮은가격순</ToggleButton>
                    <ToggleButton value="price-high">높은가격순</ToggleButton>
                    <ToggleButton value="discount">할인율순</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Box>

              {/* 뷰 밀도 토글 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mr: 1 }}
                >
                  뷰:
                </Typography>
                <ToggleButtonGroup
                  value={viewDensity}
                  exclusive
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      setViewDensity(newValue);
                    }
                  }}
                  size="small"
                >
                  <Tooltip title="컴팩트 뷰">
                    <ToggleButton value="compact" aria-label="compact">
                      <Grid size={16} />
                    </ToggleButton>
                  </Tooltip>
                  <Tooltip title="기본 뷰">
                    <ToggleButton value="default" aria-label="default">
                      <Grid3X3 size={16} />
                    </ToggleButton>
                  </Tooltip>
                  <Tooltip title="여유 뷰">
                    <ToggleButton value="spacious" aria-label="spacious">
                      <List size={16} />
                    </ToggleButton>
                  </Tooltip>
                </ToggleButtonGroup>
              </Box>
            </Box>

            {/* 로딩 상태 */}
            {isLoading && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: getGridSettings(),
                  gap: 3,
                }}
              >
                {[...Array(8)].map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      height={200}
                      sx={{ mb: 2 }}
                    />
                    <Skeleton
                      variant="text"
                      height={24}
                      width="80%"
                      sx={{ mb: 1 }}
                    />
                    <Skeleton
                      variant="text"
                      height={20}
                      width="60%"
                      sx={{ mb: 1 }}
                    />
                    <Skeleton variant="text" height={20} width="40%" />
                  </Box>
                ))}
              </Box>
            )}

            {/* 에러 상태 */}
            {error && (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" color="error" sx={{ mb: 2 }}>
                  상품 목록을 불러오는데 실패했습니다.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => window.location.reload()}
                >
                  다시 시도
                </Button>
              </Box>
            )}

            {/* 상품 그리드 - 뷰 밀도에 따른 동적 그리드 */}
            {!isLoading && !error && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: getGridSettings(),
                  gap: viewDensity === "compact" ? 2 : 3,
                }}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Box>
            )}

            {/* 상품이 없을 때 */}
            {sortedProducts.length === 0 && (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  조건에 맞는 상품이 없습니다.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleResetFilters}
                  sx={{ mt: 2 }}
                >
                  필터 초기화
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductListPage;
