import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout.jsx";
import { createSafeLazyComponent } from "../utils/lazyLoading.jsx";

// Lazy loading을 위한 컴포넌트들
const MainPage = createSafeLazyComponent(() => import("../pages/MainPage"));
const WidgetCheckout = createSafeLazyComponent(() =>
  import("../pages/toss/WidgetCheckout")
);
const CategoryListPage = createSafeLazyComponent(
  () => import("../features/category/CategoryListPage"),
  "CategoryListPage"
);
const ProductListPage = createSafeLazyComponent(() =>
  import("../pages/product/ProductListPage")
);
const ProductDetailPage = createSafeLazyComponent(
  () => import("../pages/product/ProductDetailPage"),
  "ProductDetailPage"
);
const OrderPage = createSafeLazyComponent(
  () => import("../pages/order/OrderPage"),
  "OrderPage"
);
const CouponPopup = createSafeLazyComponent(() =>
  import("../pages/CouponPopup")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "category", element: <CategoryListPage /> },
      { path: "products", element: <ProductListPage /> },
      { path: "product/:productId", element: <ProductDetailPage /> },
      { path: "order", element: <OrderPage /> },
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
