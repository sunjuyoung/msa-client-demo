import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  IconButton,
  Tooltip,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { SortAsc, SortDesc, X, Grid3X3, Grid, List } from "lucide-react";
import ProductCard from "../../features/product/components/ProductCard";

const ProductListPage = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [viewDensity, setViewDensity] = useState("default");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedBenefits, setSelectedBenefits] = useState([]);

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

  // 혜택 데이터
  const benefits = [
    { id: "sale", name: "세일", count: 12 },
    { id: "new", name: "신상품", count: 8 },
    { id: "best", name: "베스트", count: 15 },
    { id: "free-shipping", name: "무료배송", count: 20 },
  ];

  // 상품 데이터
  const products = [
    {
      id: 1,
      name: "여름 원피스",
      description: "시원하고 트렌디한 여름 원피스",
      image: "/images/products/girl-mb-data.jpg",
      price: 89000,
      originalPrice: 120000,
      category: "여성 의류",
      size: ["S", "M", "L"],
      color: ["black", "white", "beige"],
      benefits: ["new", "sale"],
      isNew: true,
      popularity: 95,
      discountRate: 26,
    },
    {
      id: 2,
      name: "데님 팬츠",
      description: "클래식한 데님 팬츠",
      image: "/images/products/mens-mb-data.jpg",
      price: 129000,
      originalPrice: 129000,
      category: "남성 의류",
      size: ["M", "L", "XL"],
      color: ["navy", "gray"],
      benefits: ["best"],
      isNew: false,
      popularity: 88,
      discountRate: 0,
    },
    {
      id: 3,
      name: "니트 스웨터",
      description: "부드럽고 따뜻한 니트 스웨터",
      image: "/images/products/girl-mb-data.jpg",
      price: 159000,
      originalPrice: 199000,
      category: "여성 의류",
      size: ["S", "M", "L", "XL"],
      color: ["black", "gray", "beige"],
      benefits: ["new", "free-shipping"],
      isNew: true,
      popularity: 92,
      discountRate: 20,
    },
    {
      id: 4,
      name: "가죽 자켓",
      description: "스타일리시한 가죽 자켓",
      image: "/images/products/mens-mb-data.jpg",
      price: 299000,
      originalPrice: 399000,
      category: "남성 의류",
      size: ["M", "L", "XL"],
      color: ["black", "navy"],
      benefits: ["best", "free-shipping"],
      isNew: false,
      popularity: 85,
      discountRate: 25,
    },
    {
      id: 5,
      name: "실크 블라우스",
      description: "고급스러운 실크 블라우스",
      image: "/images/products/girl-mb-data.jpg",
      price: 189000,
      originalPrice: 250000,
      category: "여성 의류",
      size: ["XS", "S", "M"],
      color: ["white", "beige", "red"],
      benefits: ["new", "sale"],
      isNew: true,
      popularity: 78,
      discountRate: 24,
    },
    {
      id: 6,
      name: "스니커즈",
      description: "편안하고 스타일리시한 스니커즈",
      image: "/images/products/mens-mb-data.jpg",
      price: 99000,
      originalPrice: 129000,
      category: "신발",
      size: ["S", "M", "L"],
      color: ["black", "white", "navy"],
      benefits: ["best"],
      isNew: false,
      popularity: 82,
      discountRate: 23,
    },
    {
      id: 7,
      name: "가죽 가방",
      description: "고급스러운 가죽 가방",
      image: "/images/products/girl-mb-data.jpg",
      price: 249000,
      originalPrice: 320000,
      category: "가방",
      size: ["ONE"],
      color: ["black", "brown"],
      benefits: ["best", "free-shipping"],
      isNew: false,
      popularity: 90,
      discountRate: 22,
    },
    {
      id: 8,
      name: "실버 목걸이",
      description: "우아한 실버 목걸이",
      image: "/images/products/mens-mb-data.jpg",
      price: 89000,
      originalPrice: 120000,
      category: "액세서리",
      size: ["ONE"],
      color: ["silver"],
      benefits: ["sale"],
      isNew: false,
      popularity: 75,
      discountRate: 26,
    },
  ];

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
    const benefitMatch =
      selectedBenefits.length === 0 ||
      product.benefits.some((benefit) => selectedBenefits.includes(benefit));
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return (
      categoryMatch && sizeMatch && colorMatch && benefitMatch && priceMatch
    );
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

              <Divider />

              {/* 혜택 */}
              <Accordion disableGutters sx={{ boxShadow: "none" }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    혜택
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {benefits.map((benefit) => (
                      <FormControlLabel
                        key={benefit.id}
                        control={
                          <Checkbox
                            checked={selectedBenefits.includes(benefit.id)}
                            onChange={() =>
                              handleMultiSelect(
                                selectedBenefits,
                                setSelectedBenefits,
                                benefit.id
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
                            <span>{benefit.name}</span>
                            <Chip label={benefit.count} size="small" />
                          </Box>
                        }
                        sx={{ width: "100%", mb: 1 }}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
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

            {/* 상품 그리드 - 뷰 밀도에 따른 동적 그리드 */}
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
