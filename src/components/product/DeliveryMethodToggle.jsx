import { useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import { usePdpState } from "../../hooks/usePdpState";

const deliveryMethods = {
  standard: {
    value: "standard",
    label: "일반배송",
    description: "1-2일 내 배송",
    price: 0,
    info: "오후 3시까지 주문 시 당일 출고, 다음날 배송",
  },
  express: {
    value: "express",
    label: "빠른배송",
    description: "당일 배송",
    price: 3000,
    info: "오전 11시까지 주문 시 당일 오후 배송 (서울/경기 지역)",
  },
};

export function DeliveryMethodToggle() {
  const { deliveryMethod, setDeliveryMethod } = usePdpState();
  const [showInfo, setShowInfo] = useState(false);

  const handleDeliveryChange = (event, newMethod) => {
    if (newMethod !== null) {
      setDeliveryMethod(newMethod);
    }
  };

  const selectedMethod =
    deliveryMethods[deliveryMethod] || deliveryMethods.standard;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          배송 방법
        </Typography>
        <Tooltip title="배송 방법 안내" arrow>
          <IconButton
            size="small"
            onClick={() => setShowInfo(!showInfo)}
            sx={{ ml: 1 }}
          >
            <Info fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* 배송 방법 선택 */}
      <ToggleButtonGroup
        value={deliveryMethod}
        exclusive
        onChange={handleDeliveryChange}
        aria-label="배송 방법 선택"
        sx={{ mb: 2 }}
      >
        {Object.values(deliveryMethods).map((method) => (
          <ToggleButton
            key={method.value}
            value={method.value}
            aria-label={`${method.label} 선택`}
            sx={{
              minWidth: 120,
              height: 60,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {method.label}
            </Typography>
            <Typography variant="caption">{method.description}</Typography>
            {method.price > 0 && (
              <Typography variant="caption" color="inherit">
                +{method.price.toLocaleString()}원
              </Typography>
            )}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* 선택된 배송 방법 안내 */}
      <Alert
        severity="info"
        sx={{
          mb: showInfo ? 2 : 0,
          "& .MuiAlert-message": {
            width: "100%",
          },
        }}
      >
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
            {selectedMethod.label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedMethod.info}
          </Typography>
        </Box>
      </Alert>

      {/* 상세 안내 (토글) */}
      {showInfo && (
        <Box sx={{ mt: 2, p: 2, backgroundColor: "grey.50", borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            배송 안내
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                일반배송
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.875rem" }}
              >
                • 오후 3시까지 주문 시 당일 출고
                <br />
                • 다음날 오전/오후 배송
                <br />
                • 전국 모든 지역 배송 가능
                <br />• 무료배송 (3만원 이상)
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                빠른배송
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.875rem" }}
              >
                • 오전 11시까지 주문 시 당일 오후 배송
                <br />
                • 서울/경기 지역만 가능
                <br />
                • 추가 배송비 3,000원
                <br />• 기상 상황에 따라 배송 지연 가능
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
