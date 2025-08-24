import React from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import { Search, X } from "lucide-react";

const MobileSearchModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        zIndex: 1200,
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          검색
        </Typography>
        <IconButton onClick={onClose}>
          <X size={24} />
        </IconButton>
      </Box>

      {/* Search Input */}
      <TextField
        fullWidth
        placeholder="상품을 검색해보세요"
        variant="outlined"
        InputProps={{
          startAdornment: <Search size={20} style={{ marginRight: 8 }} />,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            backgroundColor: "grey.50",
          },
        }}
        autoFocus
      />

      {/* Recent Searches */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, color: "grey.600" }}>
          최근 검색어
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {["여름 원피스", "데님 팬츠", "니트 스웨터"].map((term) => (
            <Box
              key={term}
              sx={{
                px: 2,
                py: 1,
                backgroundColor: "grey.100",
                borderRadius: 2,
                fontSize: "0.875rem",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "grey.200",
                },
              }}
            >
              {term}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MobileSearchModal;
