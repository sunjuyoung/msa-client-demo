import { useState, useEffect } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ExpandMore,
  Info,
  LocalShipping,
  Warning,
  CheckCircle,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const accordionSections = [
  {
    id: "details",
    title: "상세정보",
    icon: <Info />,
    defaultExpanded: true,
  },
  {
    id: "size-guide",
    title: "사이즈표",
    icon: <Info />,
    defaultExpanded: false,
  },
  {
    id: "delivery",
    title: "배송",
    icon: <LocalShipping />,
    defaultExpanded: false,
  },
  {
    id: "care",
    title: "유의사항",
    icon: <Warning />,
    defaultExpanded: false,
  },
];

export function PdpAccordion({ product }) {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState("details");

  // URL hash에 따른 초기 섹션 설정
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && accordionSections.find((section) => section.id === hash)) {
      setExpandedSection(hash);
    }
  }, [location.hash]);

  // 섹션 변경 시 URL hash 업데이트
  const handleSectionChange = (sectionId) => {
    setExpandedSection(sectionId === expandedSection ? false : sectionId);

    // URL hash 업데이트
    if (sectionId !== expandedSection) {
      window.location.hash = sectionId;
    } else {
      window.location.hash = "";
    }
  };

  // 상세정보 렌더링
  const renderDetails = () => (
    <Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {product.description}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          상품 특징
        </Typography>
        <List dense>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircle fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="고급 코튼 소재로 제작되어 부드럽고 편안한 착용감"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircle fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="베이직한 디자인으로 다양한 스타일링 가능"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircle fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="일상복부터 데이트룩까지 활용도 높음"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
        </List>
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          소재 및 관리
        </Typography>
        <List dense>
          {product.careInstructions?.map((instruction, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Info fontSize="small" color="info" />
              </ListItemIcon>
              <ListItemText
                primary={instruction}
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  // 사이즈표 렌더링
  const renderSizeGuide = () => (
    <Box>
      <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
        * 단위: cm
      </Typography>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>사이즈</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                가슴
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                길이
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                어깨
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(product.sizeGuide?.chest || {}).map((size) => (
              <TableRow key={size}>
                <TableCell sx={{ fontWeight: 600 }}>{size}</TableCell>
                <TableCell align="center">
                  {product.sizeGuide.chest[size]}
                </TableCell>
                <TableCell align="center">
                  {product.sizeGuide.length[size]}
                </TableCell>
                <TableCell align="center">
                  {product.sizeGuide.shoulder[size]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, p: 2, backgroundColor: "info.50", borderRadius: 1 }}>
        <Typography variant="body2" color="info.main">
          💡 사이즈 선택 팁: 평소 입는 티셔츠 사이즈를 기준으로 선택하시면
          됩니다.
        </Typography>
      </Box>
    </Box>
  );

  // 배송 정보 렌더링
  const renderDelivery = () => (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          배송 방법
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip label="일반배송" size="small" color="primary" />
            <Typography variant="body2">
              오후 3시까지 주문 시 당일 출고, 다음날 배송
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip label="빠른배송" size="small" color="error" />
            <Typography variant="body2">
              오전 11시까지 주문 시 당일 오후 배송 (서울/경기 지역)
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          배송비
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • 3만원 이상 구매 시 무료배송
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • 3만원 미만 구매 시 3,000원
        </Typography>
        <Typography variant="body2">• 빠른배송 선택 시 추가 3,000원</Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          반품/교환
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • 30일 이내 무료반품/교환 가능
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • 상품 수령 후 7일 이내 반품 신청
        </Typography>
        <Typography variant="body2">
          • 단순 변심 시 왕복 배송비 고객 부담
        </Typography>
      </Box>
    </Box>
  );

  // 유의사항 렌더링
  const renderCare = () => (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          주의사항
        </Typography>
        <List dense>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Warning fontSize="small" color="warning" />
            </ListItemIcon>
            <ListItemText
              primary="색상은 모니터 설정에 따라 실제와 다를 수 있습니다"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Warning fontSize="small" color="warning" />
            </ListItemIcon>
            <ListItemText
              primary="사이즈는 참고용이며, 개인차이가 있을 수 있습니다"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Warning fontSize="small" color="warning" />
            </ListItemIcon>
            <ListItemText
              primary="세탁 시 색상이 빠질 수 있으니 단독 세탁을 권장합니다"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
        </List>
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          품질 보증
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • 정품 보증: 구매일로부터 1년간 품질 보증
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • 제조사: TBH (Made in Korea)
        </Typography>
        <Typography variant="body2">
          • A/S: 고객센터를 통해 접수 가능
        </Typography>
      </Box>
    </Box>
  );

  // 섹션별 내용 렌더링
  const renderSectionContent = (sectionId) => {
    switch (sectionId) {
      case "details":
        return renderDetails();
      case "size-guide":
        return renderSizeGuide();
      case "delivery":
        return renderDelivery();
      case "care":
        return renderCare();
      default:
        return null;
    }
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        상품 정보
      </Typography>

      {accordionSections.map((section) => (
        <Accordion
          key={section.id}
          expanded={expandedSection === section.id}
          onChange={() => handleSectionChange(section.id)}
          sx={{
            mb: 1,
            "&:before": {
              display: "none",
            },
            "&.Mui-expanded": {
              margin: "8px 0",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              backgroundColor:
                expandedSection === section.id ? "primary.50" : "transparent",
              "&:hover": {
                backgroundColor: "grey.50",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {section.icon}
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {section.title}
              </Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails sx={{ pt: 0 }}>
            {renderSectionContent(section.id)}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
