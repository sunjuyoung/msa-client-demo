import { Grid, Box } from "@mui/material";
import { PdpGallery } from "./PdpGallery";
import { PdpInfo } from "./PdpInfo";

export function PdpLayout({ product }) {
  return (
    <Box component="main" role="main" aria-label="상품 상세 정보">
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* 좌측 갤러리 */}
        <Box
          component="section"
          aria-label="상품 이미지 갤러리"
          sx={{
            flex: { xs: "1", md: "0 0 40%" },
            maxWidth: { xs: "100%", md: "500px" },
          }}
        >
          <PdpGallery product={product} />
        </Box>

        {/* 우측 상품 정보 */}
        <Box
          component="section"
          aria-label="상품 정보 및 구매 옵션"
          sx={{
            flex: { xs: "1", md: "0 0 60%" },
            minWidth: { xs: "100%", md: "450px" },
          }}
        >
          <PdpInfo product={product} />
        </Box>
      </Box>
    </Box>
  );
}
