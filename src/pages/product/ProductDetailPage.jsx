import { useParams } from "react-router-dom";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { PdpLayout } from "../../components/product/PdpLayout";
import { PdpAccordion } from "../../components/product/PdpAccordion";

// Mock API function - 실제로는 API에서 가져올 데이터
const fetchProductDetail = async (productId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id: productId,
    name: "프리미엄 코튼 베이직 티셔츠",
    brand: "TBH",
    price: 89000,
    originalPrice: 129000,
    discount: 31,
    memberPrice: 80100,
    description:
      "고급스러운 코튼 소재로 제작된 베이직 티셔츠입니다. 일상복으로도, 데이트룩으로도 활용하기 좋은 아이템입니다.",
    colors: [
      {
        name: "블랙",
        code: "#000000",
        stock: 15,
        images: ["/images/products/girl-mb-data.jpg"],
      },
      {
        name: "화이트",
        code: "#FFFFFF",
        stock: 8,
        images: ["/images/products/mens-mb-data.jpg"],
      },
      {
        name: "네이비",
        code: "#000080",
        stock: 12,
        images: ["/images/products/girl-mb-data.jpg"],
      },
      {
        name: "그레이",
        code: "#808080",
        stock: 0,
        images: ["/images/products/mens-mb-data.jpg"],
      },
    ],
    sizes: [
      { name: "XS", stock: 5 },
      { name: "S", stock: 12 },
      { name: "M", stock: 18 },
      { name: "L", stock: 15 },
      { name: "XL", stock: 8 },
      { name: "XXL", stock: 3 },
    ],
    images: [
      "/images/products/girl-mb-data.jpg",
      "/images/products/mens-mb-data.jpg",
      "/images/products/girl-mb-data.jpg",
      "/images/products/mens-mb-data.jpg",
      "/images/products/girl-mb-data.jpg",
    ],
    category: "의류",
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
      chest: { XS: 88, S: 92, M: 96, L: 100, XL: 104, XXL: 108 },
      length: { XS: 64, S: 66, M: 68, L: 70, XL: 72, XXL: 74 },
      shoulder: { XS: 36, S: 38, M: 40, L: 42, XL: 44, XXL: 46 },
    },
  };
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
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <PdpLayout product={product} />
        <PdpAccordion product={product} />
      </Container>
    </Box>
  );
}
