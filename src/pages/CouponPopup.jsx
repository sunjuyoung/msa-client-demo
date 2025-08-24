import React from "react";
import SummerCouponModal from "../components/common/SummerCouponModal";

export default function CouponPopup() {
  // 팝업 닫기 핸들러
  const handleClose = React.useCallback(() => {
    window.close();
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full bg-gray-50">
      <SummerCouponModal open={true} onClose={handleClose} />
    </div>
  );
}
