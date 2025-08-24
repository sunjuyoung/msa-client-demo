import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Gift, Clock, Star } from "lucide-react";

const SummerCouponModal = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // 스크롤을 막지 않음 - 메인페이지 스크롤 허용
      // document.body.style.overflow = "hidden"; // 제거
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else {
      // document.body.style.overflow = "unset"; // 제거
    }

    return () => {
      // document.body.style.overflow = "unset"; // 제거
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      const el = dialogRef.current;
      setTimeout(() => el?.focus(), 100);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        style={{
          position: "fixed",
          top: 100,
          left: 10,
          right: 0,
          bottom: 0,
        }}
        className="z-[99999] flex items-start justify-center bg-black/50 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          ref={dialogRef}
          tabIndex={-1}
          className="overflow-hidden relative mx-4 w-full rounded-3xl shadow-2xl focus:outline-none"
          style={{
            maxWidth: "33.333vw",
            minWidth: "380px",
            background:
              "linear-gradient(135deg, #ffffff 0%, #f8fbff 50%, #f0f8ff 100%)",
            border: "2px solid #87ceeb",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(135, 206, 235, 0.1)",
          }}
          initial={{ y: -50, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: -50, scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="relative p-8 pb-6 pl-30">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full transition-colors hover:bg-sky-50"
            >
              <X size={20} className="text-sky-600" />
            </button>

            {/* 선착순 배지 */}
            <div className="inline-flex gap-2 items-center px-4 py-2 mb-4 bg-gradient-to-r from-sky-100 to-blue-100 rounded-full border border-sky-200">
              <Clock size={16} className="text-sky-600" />
              <span className="text-sm font-semibold text-sky-700">
                선착순 한정
              </span>
            </div>

            {/* 메인 타이틀 */}
            <h2 className="mb-3 text-3xl font-bold leading-tight text-gray-800">
              여름 시즌
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
                특별 쿠폰
              </span>
            </h2>

            <p className="text-lg leading-relaxed text-gray-600">
              시원한 여름을 위한 특별한 혜택을 놓치지 마세요!
            </p>
          </div>

          {/* 쿠폰 내용 */}
          <div className="px-12 pb-8">
            {/* 쿠폰 혜택 */}
            <div className="p-6 mb-6 bg-white rounded-2xl border border-sky-100 shadow-sm">
              <div className="flex gap-3 items-center mb-4">
                <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full">
                  <Gift size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    최대 50% 할인
                  </h3>
                  <p className="text-gray-600">전체 상품 대상</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3 items-center">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="text-gray-700">신상품 30% 할인</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="text-gray-700">무료 배송</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="text-gray-700">추가 할인 쿠폰</span>
                </div>
              </div>
            </div>

            {/* 유의사항 */}
            <div className="mb-6 text-sm leading-relaxed text-gray-500">
              <p className="mb-2">
                • 쿠폰은 선착순으로 발급되며, 수량이 한정되어 있습니다.
              </p>
              <p className="mb-2">• 사용 기간: 2024년 7월 31일까지</p>
              <p>• 중복 사용 불가, 타 쿠폰과 함께 사용 불가</p>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex gap-4 justify-center items-center h-14">
              <button className="flex-1 px-6 h-full font-semibold text-sky-600 rounded-xl border-2 border-sky-500 transition-all duration-200 hover:bg-sky-50 hover:border-sky-600 hover:text-sky-700">
                쿠폰 받기
              </button>
              <button className="flex-1 px-6 h-full font-medium text-gray-600 rounded-xl border border-gray-300 transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-700">
                나중에 받기
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default SummerCouponModal;
