import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import router from "./router";
import ErrorBoundary from "./components/common/ErrorBoundary";

// 로딩 스피너 컴포넌트
const LoadingSpinner = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "white",
    }}
  >
    <CircularProgress size={60} />
  </Box>
);

function App() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={<LoadingSpinner />}
        onError={(error) => {
          console.error("Suspense error:", error);
        }}
      >
        <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
