import { useParams } from "react-router-dom";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { PdpLayout } from "../../components/product/PdpLayout";
import { PdpAccordion } from "../../components/product/PdpAccordion";

// API 호출 함수
const fetchProductDetail = async (productId) => {
  const response = await fetch(
    `http://localhost:8080/product-service/product/${productId}`
  );

  if (!response.ok) {
    throw new Error("상품 정보를 불러오는데 실패했습니다.");
  }

  const apiData = await response.json();

  // API 데이터와 더미 데이터를 병합
  return {
    id: apiData.productId,
    name: apiData.name,
    description: apiData.description,
    price: apiData.price,
    category: apiData.category,
    options: apiData.options.map((option) => ({
      ...option,
      // API에 없는 colorCode는 색상에 따라 매핑
      colorCode: getColorCode(option.color),
    })),
    // 더미 데이터에만 존재하는 값들은 현재 값으로 고정
    brand: "TBH",
    originalPrice: Math.round(apiData.price * 1.1), // price에서 10% 더한 값
    discount: 10, // 10% 고정
    memberPrice: apiData.price - 10000, // price에서 10000 뺀 값
    images: [
      "/images/products/girl-mb-data.jpg",
      "/images/products/girl-mb-data.jpg",
      "/images/products/girl-mb-data.jpg",
      "/images/products/girl-mb-data.jpg",
      "/images/products/girl-mb-data.jpg",
    ],
    subCategory: "티셔츠",
    tags: ["베이직", "코튼", "캐주얼", "데일리"],
    isNew: true,
    isBest: false,
    freeShipping: true,
    freeReturn: true,
    deliveryTime: "1-2일",
    returnPeriod: "30일",
    careInstructions: [
      "30도 이하에서 세탁",
      "표백제 사용 금지",
      "다리미 사용 시 스팀 다리미 권장",
      "건조기 사용 금지",
    ],
    sizeGuide: {
      chest: { 90: 90, 95: 95, 100: 100, 105: 105 },
      length: { 90: 64, 95: 66, 100: 68, 105: 70 },
      shoulder: { 90: 36, 95: 38, 100: 40, 105: 42 },
    },
  };
};

// 색상 코드 매핑 함수
const getColorCode = (color) => {
  const colorMap = {
    BLACK: "#000000",
    WHITE: "#FFFFFF",
    BLUE: "#000080",
    NAVY: "#000080",
    GRAY: "#808080",
    RED: "#FF0000",
    GREEN: "#008000",
    YELLOW: "#FFFF00",
    PINK: "#FFC0CB",
    PURPLE: "#800080",
    ORANGE: "#FFA500",
    BROWN: "#A52A2A",
  };

  return colorMap[color] || "#CCCCCC"; // 기본값은 회색
};

export function ProductDetailPage() {
  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductDetail(productId),
    enabled: !!productId, // productId가 있을 때만 쿼리 실행
  });

  if (!productId) {
    return (
      <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Typography variant="h5" color="error" sx={{ textAlign: "center" }}>
            상품 ID가 올바르지 않습니다.
          </Typography>
        </Container>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Skeleton variant="rectangular" height={600} />
            <Skeleton variant="text" height={32} width="60%" />
            <Skeleton variant="text" height={24} width="40%" />
          </Box>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Typography variant="h5" color="error" sx={{ textAlign: "center" }}>
            상품 정보를 불러오는데 실패했습니다.
          </Typography>
        </Container>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Typography variant="h5" color="error" sx={{ textAlign: "center" }}>
            상품 정보를 불러올 수 없습니다.
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Container
        maxWidth={false}
        sx={{ py: 6, px: { xs: 2, sm: 4, md: 6, lg: 8 } }}
      >
        <PdpLayout product={product} />
        <PdpAccordion product={product} />
      </Container>
    </Box>
  );
}
