import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  IconButton,
  Badge,
  Container,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search, ShoppingCart, Person, Menu } from "@mui/icons-material";
import MobileSearchModal from "../search/MobileSearchModal";

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 현재 경로에 따른 탭 설정
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setCurrentTab(0);
    else if (path.includes("/products")) setCurrentTab(1);
    else if (path.includes("/category")) setCurrentTab(2);
    else if (path.includes("/accessories")) setCurrentTab(3);
  }, [location.pathname]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/products");
        break;
      case 2:
        navigate("/category");
        break;
      case 3:
        navigate("/accessories");
        break;
      default:
        break;
    }
  };

  const categories = [
    { label: "NEW", value: 0 },
    { label: "여성", value: 1 },
    { label: "남성", value: 2 },
    { label: "ACC", value: 3 },
  ];

  return (
    <>
      <Box
        component="header"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "white",
          transition: "all 0.3s ease",
          boxShadow: isScrolled
            ? "0 4px 20px rgba(0, 0, 0, 0.15)"
            : "0 2px 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* 메인 헤더 */}
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: isScrolled ? "60px" : "80px",
              transition: "height 0.3s ease",
            }}
          >
            {/* 좌측 로고 */}
            <Box
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: isScrolled ? "32px" : "40px",
                  height: isScrolled ? "32px" : "40px",
                  backgroundColor: "neutral.900",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: isScrolled ? "0.875rem" : "1rem",
                  transition: "all 0.3s ease",
                }}
              >
                TBH
              </Box>
              <Box
                sx={{
                  fontSize: isScrolled ? "1.25rem" : "1.5rem",
                  fontWeight: 700,
                  color: "neutral.900",
                  transition: "font-size 0.3s ease",
                }}
              >
                SHOP
              </Box>
            </Box>

            {/* 중앙 카테고리 탭 (데스크톱) */}
            {!isMobile && (
              <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <Tabs
                  value={currentTab}
                  onChange={handleTabChange}
                  sx={{
                    "& .MuiTab-root": {
                      minWidth: "80px",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "neutral.600",
                      textTransform: "none",
                      "&.Mui-selected": {
                        color: "neutral.900",
                        fontWeight: 600,
                      },
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "neutral.900",
                      height: "2px",
                    },
                  }}
                >
                  {categories.map((category) => (
                    <Tab
                      key={category.value}
                      label={category.label}
                      value={category.value}
                    />
                  ))}
                </Tabs>
              </Box>
            )}

            {/* 우측 아이콘들 */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* 검색 */}
              <IconButton
                onClick={() => setSearchModalOpen(true)}
                sx={{
                  color: "neutral.700",
                  p: 1,
                  "&:hover": { backgroundColor: "neutral.50" },
                }}
              >
                <Search size={20} />
              </IconButton>

              {/* 장바구니 */}
              <IconButton
                sx={{
                  color: "neutral.700",
                  p: 1,
                  "&:hover": { backgroundColor: "neutral.50" },
                }}
              >
                <Badge badgeContent={3} color="error">
                  <ShoppingCart size={20} />
                </Badge>
              </IconButton>

              {/* 마이페이지 */}
              <IconButton
                sx={{
                  color: "neutral.700",
                  p: 1,
                  "&:hover": { backgroundColor: "neutral.50" },
                }}
              >
                <Person size={20} />
              </IconButton>

              {/* 모바일 메뉴 */}
              {isMobile && (
                <IconButton
                  sx={{
                    color: "neutral.700",
                    p: 1,
                    "&:hover": { backgroundColor: "neutral.50" },
                  }}
                >
                  <Menu size={20} />
                </IconButton>
              )}
            </Box>
          </Box>

          {/* 모바일 카테고리 탭 */}
          {isMobile && (
            <Box
              sx={{
                borderTop: "1px solid",
                borderColor: "divider",
                backgroundColor: "neutral.50",
              }}
            >
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  "& .MuiTab-root": {
                    minWidth: "60px",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "neutral.600",
                    textTransform: "none",
                    py: 1,
                    "&.Mui-selected": {
                      color: "neutral.900",
                      fontWeight: 600,
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "neutral.900",
                    height: "2px",
                  },
                }}
              >
                {categories.map((category) => (
                  <Tab
                    key={category.value}
                    label={category.label}
                    value={category.value}
                  />
                ))}
              </Tabs>
            </Box>
          )}
        </Container>
      </Box>

      {/* 헤더 높이만큼 여백 */}
      <Box
        sx={{
          height: isScrolled ? "60px" : "80px",
          transition: "height 0.3s ease",
        }}
      />

      {/* 검색 모달 */}
      <MobileSearchModal
        open={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
};

export default AppHeader;
