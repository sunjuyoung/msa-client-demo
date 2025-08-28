import { useState, useRef, useEffect } from "react";
import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import { ZoomIn, ZoomOut, Fullscreen } from "@mui/icons-material";
import { useTheme, useMediaQuery } from "@mui/material";

export function PdpGallery({ product }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mainImageRef = useRef(null);
  const thumbnailRefs = useRef([]);

  const { images = [] } = product;

  // 프리로드 처리 (처음 2장)
  useEffect(() => {
    const preloadImages = images.slice(0, 2);
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  // 키보드 탐색
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          setSelectedImageIndex((prev) =>
            prev > 0 ? prev - 1 : images.length - 1
          );
          break;
        case "ArrowRight":
          e.preventDefault();
          setSelectedImageIndex((prev) =>
            prev < images.length - 1 ? prev + 1 : 0
          );
          break;
        case "Escape":
          if (isFullscreen) {
            setIsFullscreen(false);
          }
          if (isZoomed) {
            setIsZoomed(false);
          }
          break;
      }
    };

    if (mainImageRef.current) {
      mainImageRef.current.focus();
      mainImageRef.current.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (mainImageRef.current) {
        mainImageRef.current.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [images.length, isFullscreen, isZoomed]);

  // 선택된 이미지 변경 시 해당 썸네일로 스크롤
  useEffect(() => {
    if (thumbnailRefs.current[selectedImageIndex]) {
      thumbnailRefs.current[selectedImageIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedImageIndex]);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleMainImageClick = () => {
    if (!isZoomed) {
      setIsZoomed(true);
    }
  };

  if (images.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography color="text.secondary">
          이미지를 불러올 수 없습니다.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative" }}>
      {/* 메인 이미지 */}
      <Box
        ref={mainImageRef}
        tabIndex={0}
        role="img"
        aria-label={`${product.name} 이미지 ${selectedImageIndex + 1}`}
        onClick={handleMainImageClick}
        sx={{
          position: "relative",
          width: "100%",
          height: isMobile ? 400 : 500,
          cursor: isZoomed ? "zoom-out" : "zoom-in",
          overflow: "hidden",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "grey.50",
          "&:focus": {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 2,
          },
        }}
      >
        <img
          src={images[selectedImageIndex]}
          alt={`${product.name} - 이미지 ${selectedImageIndex + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: isZoomed ? "scale(1.5)" : "scale(1)",
            transition: "transform 0.3s ease-in-out",
          }}
        />

        {/* 확대/축소 버튼 */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            gap: 1,
          }}
        >
          <Tooltip title={isZoomed ? "축소" : "확대"}>
            <IconButton
              onClick={handleZoomToggle}
              sx={{
                backgroundColor: "rgba(255,255,255,0.9)",
                "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
              }}
              size="small"
            >
              {isZoomed ? <ZoomOut /> : <ZoomIn />}
            </IconButton>
          </Tooltip>

          <Tooltip title="전체화면">
            <IconButton
              onClick={handleFullscreenToggle}
              sx={{
                backgroundColor: "rgba(255,255,255,0.9)",
                "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
              }}
              size="small"
            >
              <Fullscreen />
            </IconButton>
          </Tooltip>
        </Box>

        {/* 이미지 카운터 */}
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            px: 2,
            py: 1,
            borderRadius: 1,
            fontSize: "0.875rem",
          }}
        >
          {selectedImageIndex + 1} / {images.length}
        </Box>
      </Box>

      {/* 썸네일 리스트 */}
      {images.length > 1 && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 1,
            overflowX: "auto",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              height: 6,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "grey.100",
              borderRadius: 3,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "grey.400",
              borderRadius: 3,
            },
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              ref={(el) => (thumbnailRefs.current[index] = el)}
              onClick={() => handleThumbnailClick(index)}
              sx={{
                flexShrink: 0,
                width: 80,
                height: 80,
                cursor: "pointer",
                borderRadius: 1,
                border: "2px solid",
                borderColor:
                  selectedImageIndex === index ? "primary.main" : "transparent",
                overflow: "hidden",
                position: "relative",
                "&:hover": {
                  borderColor: "primary.light",
                },
                "&:focus": {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: 2,
                },
              }}
              tabIndex={0}
              role="button"
              aria-label={`${product.name} 썸네일 ${index + 1}`}
              aria-pressed={selectedImageIndex === index}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleThumbnailClick(index);
                }
              }}
            >
              <img
                src={image}
                alt={`${product.name} 썸네일 ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                loading={index < 2 ? "eager" : "lazy"}
              />

              {/* 선택 표시 */}
              {selectedImageIndex === index && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(25, 118, 210, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "white",
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
