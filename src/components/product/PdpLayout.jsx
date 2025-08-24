import { Grid, Box } from "@mui/material";
import { PdpGallery } from "./PdpGallery";
import { PdpInfo } from "./PdpInfo";

export function PdpLayout({ product }) {
  return (
    <Box component="main" role="main" aria-label="상품 상세 정보">
      <Grid container spacing={4}>
        {/* 좌측 갤러리 */}
        <Grid
          columns={{ xs: 12, md: 6, xl: 7 }}
          component="section"
          aria-label="상품 이미지 갤러리"
        >
          <PdpGallery product={product} />
        </Grid>

        {/* 우측 상품 정보 */}
        <Grid
          columns={{ xs: 12, md: 6, xl: 5 }}
          component="section"
          aria-label="상품 정보 및 구매 옵션"
        >
          <PdpInfo product={product} />
        </Grid>
      </Grid>
    </Box>
  );
}
