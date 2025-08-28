import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Skeleton,
  Divider,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Pagination,
  Modal,
  Fab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ExpandMore,
  FilterList,
  ViewModule,
  ViewList,
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Close,
  NavigateNext,
  NavigateBefore,
} from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { mockProducts } from "./mockProducts";
import { useNavigate } from "react-router-dom";

// 실제 이미지 파일들
const productImages = [
  "/images/products/girl-mb-data.jpg",
  "/images/products/mens-mb-data.jpg",
];

// 랜덤으로 이미지 선택하는 함수
const getRandomImage = () => {
  return productImages[Math.floor(Math.random() * productImages.length)];
};

// 필터 옵션들
const filterOptions = {
  category: ["PANTS", "TOP", "OUTER", "SHOES"],
  size: ["90", "95", "100", "105", "110"],
  color: [
    "블랙",
    "화이트",
    "네이비",
    "그레이",
    "베이지",
    "레드",
    "블루",
    "그린",
  ],
  price: ["~3만원", "3~5만원", "5~10만원", "10~20만원", "20만원~"],
  benefit: ["신상품", "세일", "무료배송", "무료반품", "쿠폰적용"],
};

// 정렬 옵션들
const sortOptions = [
  { value: "new", label: "신상품" },
  { value: "popular", label: "인기" },
  { value: "price-low", label: "낮은가격" },
  { value: "price-high", label: "높은가격" },
  { value: "discount", label: "할인율" },
];

// Mock API function
const fetchProducts = async (filters = {}, sort = "new", page = 1) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let filtered = [...mockProducts];

  // 필터 적용
  if (filters.category?.length) {
    filtered = filtered.filter((p) => filters.category.includes(p.category));
  }
  if (filters.size?.length) {
    filtered = filtered.filter((p) =>
      p.size.some((s) => filters.size.includes(s))
    );
  }
  if (filters.color?.length) {
    filtered = filtered.filter((p) =>
      p.colors.some((c) => filters.color.includes(c))
    );
  }
  if (filters.benefit?.length) {
    filtered = filtered.filter((p) => {
      if (filters.benefit.includes("신상품")) return p.isNew;
      if (filters.benefit.includes("세일")) return p.discount > 0;
      return true;
    });
  }

  // 정렬 적용
  switch (sort) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "discount":
      filtered.sort((a, b) => b.discount - a.discount);
      break;
    case "popular":
      filtered.sort((a, b) => Math.random() - 0.5); // 실제로는 인기도 기준
      break;
    default: // new
      filtered.sort((a, b) => b.id - a.id);
  }

  // 페이지네이션
  const itemsPerPage = 12;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return {
    products: filtered.slice(start, end),
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / itemsPerPage),
  };
};

// 필터 패널 컴포넌트
function FilterPanel({
  filters,
  setFilters,
  onApply,
  onReset,
  isDrawer = false,
}) {
  const handleFilterChange = (category, value, checked) => {
    setFilters((prev) => ({
      ...prev,
      [category]: checked
        ? [...(prev[category] || []), value]
        : (prev[category] || []).filter((v) => v !== value),
    }));
  };

  const getSelectedCount = (category) => filters[category]?.length || 0;

  const FilterAccordion = ({ title, category, options }) => (
    <Accordion
      defaultExpanded
      sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {title}
          {getSelectedCount(category) > 0 && (
            <Chip
              label={getSelectedCount(category)}
              size="small"
              sx={{ ml: 1, backgroundColor: "primary.main", color: "white" }}
            />
          )}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {options.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={filters[category]?.includes(option) || false}
                  onChange={(e) =>
                    handleFilterChange(category, option, e.target.checked)
                  }
                  size="small"
                />
              }
              label={option}
              sx={{ fontSize: "0.875rem" }}
            />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Box sx={{ p: isDrawer ? 2 : 0 }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          필터
        </Typography>
        {Object.values(filters).some((arr) => arr?.length > 0) && (
          <Button size="small" onClick={onReset} sx={{ color: "error.main" }}>
            초기화
          </Button>
        )}
      </Box>

      <FilterAccordion
        title="카테고리"
        category="category"
        options={filterOptions.category}
      />
      <FilterAccordion
        title="사이즈"
        category="size"
        options={filterOptions.size}
      />
      <FilterAccordion
        title="색상"
        category="color"
        options={filterOptions.color}
      />
      <FilterAccordion
        title="가격"
        category="price"
        options={filterOptions.price}
      />
      <FilterAccordion
        title="혜택"
        category="benefit"
        options={filterOptions.benefit}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={onApply}
        sx={{ mt: 3 }}
        disabled={!Object.values(filters).some((arr) => arr?.length > 0)}
      >
        필터 적용
      </Button>
    </Box>
  );
}

// 상품 카드 컴포넌트
function ProductCard({ product, onQuickView }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  return (
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
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height={200}
          image={product.image}
          alt={product.name}
          sx={{ objectFit: "cover" }}
        />

        {/* 배지들 */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {product.isNew && (
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
          {product.discount > 0 && (
            <Chip
              label={`${product.discount}%`}
              size="small"
              sx={{
                backgroundColor: "error.main",
                color: "white",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            />
          )}
        </Box>

        {/* 위시리스트 버튼 */}
        <IconButton
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "rgba(255,255,255,0.9)",
            "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
        >
          {isWishlisted ? (
            <Favorite sx={{ color: "error.main" }} />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, fontSize: "0.875rem" }}
        >
          {product.brand}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            fontWeight: 500,
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontSize: "0.875rem",
          }}
        >
          {product.name}
        </Typography>

        {/* 가격 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {product.price.toLocaleString()}원
          </Typography>
          {product.originalPrice > product.price && (
            <Typography
              variant="body2"
              sx={{
                textDecoration: "line-through",
                color: "text.secondary",
              }}
            >
              {product.originalPrice.toLocaleString()}원
            </Typography>
          )}
        </Box>

        {/* 색상 스와치 */}
        {product.colors.length > 0 && (
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {product.colors.slice(0, 5).map((color, index) => (
              <Box
                key={index}
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor:
                    color === "블랙"
                      ? "#000"
                      : color === "화이트"
                      ? "#fff"
                      : color === "네이비"
                      ? "#000080"
                      : color === "그레이"
                      ? "#808080"
                      : color === "베이지"
                      ? "#f5f5dc"
                      : color === "레드"
                      ? "#ff0000"
                      : color === "블루"
                      ? "#0000ff"
                      : color === "그린"
                      ? "#008000"
                      : "#ddd",
                  border: color === "화이트" ? "1px solid #ddd" : "none",
                }}
                title={color}
              />
            ))}
            {product.colors.length > 5 && (
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                +{product.colors.length - 5}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

// 퀵뷰 모달 컴포넌트
function QuickViewModal({ product, open, onClose }) {
  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          maxWidth: 800,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <Close />
        </IconButton>

        <Grid container>
          <Grid columns={{ xs: 12, md: 6 }}>
            <Box sx={{ p: 3 }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 8,
                }}
              />
            </Box>
          </Grid>
          <Grid columns={{ xs: 12, md: 6 }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {product.brand}
              </Typography>

              {/* 가격 */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  {product.price.toLocaleString()}원
                </Typography>
                {product.originalPrice > product.price && (
                  <Typography
                    variant="h6"
                    sx={{
                      textDecoration: "line-through",
                      color: "text.secondary",
                    }}
                  >
                    {product.originalPrice.toLocaleString()}원
                  </Typography>
                )}
              </Box>

              {/* 옵션 */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  색상
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {product.colors.map((color, index) => (
                    <Chip key={index} label={color} variant="outlined" />
                  ))}
                </Box>
              </Box>

              {/* 버튼들 */}
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  장바구니
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<FavoriteBorder />}
                  sx={{ py: 1.5 }}
                >
                  위시리스트
                </Button>
              </Box>

              {/* 배송/반품 정보 */}
              <Box sx={{ p: 2, backgroundColor: "grey.50", borderRadius: 1 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  🚚 무료배송 (3만원 이상)
                </Typography>
                <Typography variant="body2">🔄 30일 무료반품</Typography>
              </Box>

              <Button
                variant="text"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => {
                  onClose();
                  // 상세페이지로 이동
                }}
              >
                상세보기 →
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

// 메인 컴포넌트
export function CategoryListPage() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: [],
    size: [],
    color: [],
    price: [],
    benefit: [],
  });

  const [sort, setSort] = useState("new");
  const [viewMode, setViewMode] = useState("default");
  const [page, setPage] = useState(1);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // URL 쿼리 파라미터 동기화
  useEffect(() => {
    const category =
      searchParams.get("category")?.split(",").filter(Boolean) || [];
    const size = searchParams.get("size")?.split(",").filter(Boolean) || [];
    const color = searchParams.get("color")?.split(",").filter(Boolean) || [];
    const price = searchParams.get("price")?.split(",").filter(Boolean) || [];
    const benefit =
      searchParams.get("benefit")?.split(",").filter(Boolean) || [];
    const sortParam = searchParams.get("sort") || "new";
    const pageParam = parseInt(searchParams.get("page")) || 1;

    setFilters({ category, size, color, price, benefit });
    setSort(sortParam);
    setPage(pageParam);
  }, [searchParams]);

  const { data, isLoading } = useQuery({
    queryKey: ["products", filters, sort, page],
    queryFn: () => fetchProducts(filters, sort, page),
  });

  const handleFilterApply = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(","));
      }
    });

    if (sort !== "new") params.set("sort", sort);
    if (page > 1) params.set("page", page.toString());

    setSearchParams(params);
    setFilterDrawerOpen(false);
  };

  const handleFilterReset = () => {
    setFilters({
      category: [],
      size: [],
      color: [],
      price: [],
      benefit: [],
    });
    setPage(1);
    setSearchParams({});
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1);
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);
    params.delete("page");
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const selectedFiltersCount = Object.values(filters).reduce(
    (sum, arr) => sum + (arr?.length || 0),
    0
  );

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* 페이지 헤더 */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "neutral.800",
            }}
          >
            NEW ARRIVALS
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "neutral.600",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            새로운 시즌의 트렌디한 아이템들을 만나보세요
          </Typography>
        </Box>

        {/* 필터/정렬/뷰 바 + 상품리스트를 동일 선상에 배치 */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
          {/* 필터 패널 (데스크톱) */}
          {isMdUp && (
            <Box sx={{ minWidth: 220, maxWidth: 280, flex: "0 0 220px" }}>
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                onApply={handleFilterApply}
                onReset={handleFilterReset}
              />
            </Box>
          )}

          {/* 상품리스트 + 정렬/뷰바 */}
          <Box sx={{ flex: 1 }}>
            {/* 정렬/뷰바 */}
            <Box
              sx={{
                mb: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {/* 정렬 */}
              <ToggleButtonGroup
                value={sort}
                exclusive
                onChange={(e, newSort) => newSort && handleSortChange(newSort)}
                size="small"
                sx={{ mr: 2 }}
              >
                {sortOptions.map((option) => (
                  <ToggleButton key={option.value} value={option.value}>
                    {option.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              {/* 결과 개수 */}
              {data && (
                <Typography variant="body2" color="text.secondary">
                  {data.total}개 상품
                </Typography>
              )}
            </Box>

            {/* 상품 그리드 */}
            {isLoading ? (
              <Grid container spacing={3}>
                {Array.from({ length: 12 }).map((_, index) => (
                  <Grid key={index}>
                    <Card
                      sx={{
                        height: "100%",
                        backgroundColor: "white",
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Skeleton variant="rectangular" height={300} />
                      <CardContent sx={{ p: 3 }}>
                        <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                        <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
                        <Skeleton variant="text" height={20} width="60%" />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : data?.products?.length > 0 ? (
              <>
                <Grid container spacing={3}>
                  {data.products.map((product) => (
                    <Grid key={product.id}>
                      <ProductCard
                        product={product}
                        onQuickView={handleQuickView}
                        viewMode={viewMode}
                      />
                    </Grid>
                  ))}
                </Grid>

                {/* 페이지네이션 */}
                {data.totalPages > 1 && (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 8 }}
                  >
                    <Pagination
                      count={data.totalPages}
                      page={page}
                      onChange={(e, newPage) => handlePageChange(newPage)}
                      size="large"
                      showFirstButton
                      showLastButton
                    />
                  </Box>
                )}
              </>
            ) : (
              /* 빈 상태 */
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "text.secondary" }}
                >
                  조건과 일치하는 상품이 없습니다
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  다른 필터 조건을 시도해보세요
                </Typography>
                <Button variant="outlined" onClick={handleFilterReset}>
                  필터 초기화
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      {/* 필터 드로워 (모바일) */}
      <Drawer
        anchor="left"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 320,
            maxWidth: "90vw",
          },
        }}
      >
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          onApply={handleFilterApply}
          onReset={handleFilterReset}
          isDrawer={true}
        />
      </Drawer>

      {/* 퀵뷰 모달 */}
      <QuickViewModal
        product={quickViewProduct}
        open={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </Box>
  );
}
