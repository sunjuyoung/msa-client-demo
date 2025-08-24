import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import WidgetCheckout from "../pages/toss/WidgetCheckout";
import { CategoryListPage } from "../features/category/CategoryListPage";
import { ProductDetailPage } from "../pages/product/ProductDetailPage";
import { AppLayout } from "../shared/components/layout/AppLayout.jsx";
import CouponPopup from "../pages/CouponPopup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "category", element: <CategoryListPage /> },
      { path: "product/:productId", element: <ProductDetailPage /> },
      { path: "widget/checkout", element: <WidgetCheckout /> },
    ],
  },
  // 팝업 라우트(레이아웃 없이)
  {
    path: "/coupon-popup",
    element: <CouponPopup />,
  },
]);

export default router;
