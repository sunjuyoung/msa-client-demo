import React, { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STATUS = {
  idle: "idle",
  loading: "loading",
  success: "success",
  duplicated: "duplicated",
  soldout: "soldout",
  error: "error",
  unauthorized: "unauthorized",
};

export default function CouponIssueModal({ code, open, onClose }) {
  const [status, setStatus] = React.useState(STATUS.idle);
  const modalRef = useRef(null);
  const lastFocusedElement = useRef(null);

  // Focus trap
  useEffect(() => {
    if (open) {
      lastFocusedElement.current = document.activeElement;
      setTimeout(() => {
        modalRef.current?.focus();
      }, 0);
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
        // Focus trap
        if (e.key === "Tab") {
          const focusableEls = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstEl = focusableEls[0];
          const lastEl = focusableEls[focusableEls.length - 1];
          if (!e.shiftKey && document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          } else if (e.shiftKey && document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        lastFocusedElement.current?.focus();
      };
    }
  }, [open, onClose]);

  // Click outside to close
  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={handleBackdropClick}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            className="bg-gradient-to-b from-sky-100 to-white rounded-2xl shadow-2xl p-0 w-full max-w-sm mx-4 flex flex-col gap-0 outline-none border border-sky-200"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            aria-labelledby="coupon-modal-title"
            aria-describedby="coupon-modal-desc"
          >
            {/* 상단 일러스트/아이콘 */}
            <div className="flex flex-col items-center justify-center pt-7 pb-2">
              <div className="bg-sky-200 rounded-full w-16 h-16 flex items-center justify-center shadow-md mb-2">
                {/* 썸머 아이콘 (예: 선글라스, 썬, 쿠폰 등) */}
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="#38bdf8"
                    stroke="#0ea5e9"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 22c1.5 2 8.5 2 10 0"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="14" cy="16" r="1.5" fill="#fff" />
                  <circle cx="22" cy="16" r="1.5" fill="#fff" />
                </svg>
              </div>
              <span className="text-xs text-sky-500 font-semibold tracking-widest">
                SUMMER EVENT
              </span>
            </div>
            {/* Header */}
            <header
              id="coupon-modal-title"
              className="text-2xl font-extrabold text-center text-sky-700 px-6 pb-1 drop-shadow-sm"
            >
              선착순 여름 할인 쿠폰
            </header>
            {/* 본문 */}
            <section
              id="coupon-modal-desc"
              className="flex flex-col items-center gap-2 text-center px-6 pb-2"
            >
              {/* 혜택/조건/기간 자리 */}
              <div className="text-lg font-bold text-sky-900 mt-2">
                최대 ₩10,000 즉시 할인
              </div>
              <div className="text-sm text-sky-600">
                5만원 이상 구매 시 사용 가능
              </div>
              <div className="text-xs text-gray-400 mt-1">
                2024년 8월 31일 23:59까지
              </div>
              <div className="text-xs text-gray-400">
                마이쿠폰에서 확인 가능
              </div>
            </section>
            {/* 푸터 */}
            <footer className="flex flex-col gap-2 mt-2 px-6 pb-6">
              <button
                className="w-full h-12 rounded-xl font-semibold bg-gradient-to-r from-sky-400 to-sky-600 text-white shadow-lg text-lg tracking-wide transition hover:from-sky-500 hover:to-sky-700 disabled:opacity-50"
                disabled={status === STATUS.loading}
                // onClick={} // 추후 발급 로직 연결
              >
                즉시 발급 받기
              </button>
              <button
                className="w-full h-12 rounded-xl font-semibold bg-gray-100 text-sky-700 border border-sky-200 hover:bg-sky-50"
                onClick={onClose}
              >
                취소
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
