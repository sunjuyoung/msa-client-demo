import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Sun, Timer, ArrowRight, Sparkles } from "lucide-react";

/**
 * 여름 할인 쿠폰 — 선착순 팝업 (디자인 전용)
 * - React 18 + TailwindCSS
 * - 로직/데이터 연동 없이 UI만 제공
 *
 * 사용법:
 * <SummerCouponModal open={open} onClose={() => setOpen(false)} />
 */
export default function SummerCouponModal({ open, onClose }) {
  const dialogRef = useRef(null);

  // 간단한 포커스 트랩(디자인 데모용)
  useEffect(() => {
    if (!open) return;
    const el = dialogRef.current;
    const prev = document.activeElement;
    el?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [open, onClose]);

  // Portal로 body에 렌더링
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="flex fixed inset-0 z-50 justify-center items-center"
          aria-labelledby="summer-coupon-title"
          aria-describedby="summer-coupon-desc"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 backdrop-blur-sm bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            className="overflow-hidden relative mx-4 w-full max-w-md rounded-2xl shadow-2xl focus:outline-none"
            initial={{ y: 24, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <div className="relative w-full h-40 bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,white,transparent_55%)]" />
              <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full blur-2xl bg-white/15" />
              <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full blur-2xl bg-white/10" />

              <div className="flex absolute inset-0 gap-3 items-center p-6 text-white drop-shadow">
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-white/20">
                  <Sun className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-flex gap-2 items-center px-3 py-1 text-xs font-medium tracking-wide rounded-full bg-black/20">
                    <Sparkles className="w-4 h-4" />
                    선착순 혜택 진행중
                  </div>
                  <h2
                    id="summer-coupon-title"
                    className="mt-2 text-2xl font-extrabold leading-tight"
                  >
                    여름 할인 쿠폰
                  </h2>
                  <p className="opacity-90 text-sm/relaxed">
                    지금 받으면 즉시 할인 적용! 한정 수량 소진 시 종료
                  </p>
                </div>
              </div>
              <svg
                className="absolute -bottom-[1px] left-0 w-full"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  fill="#fff"
                  d="M0,64L48,80C96,96,192,128,288,117.3C384,107,480,53,576,42.7C672,32,768,64,864,80C960,96,1056,96,1152,85.3C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                />
              </svg>
            </div>

            <div className="p-6 bg-white">
              {/* Badge row */}
              <div className="flex justify-between items-center mb-3">
                <div className="inline-flex gap-2 items-center px-3 py-1 text-xs font-semibold text-cyan-700 bg-cyan-100 rounded-full">
                  선착순!
                </div>
                <div className="inline-flex gap-2 items-center text-sm text-gray-600">
                  <Timer className="w-4 h-4" />
                  <span>마감 임박</span>
                </div>
              </div>

              <div id="summer-coupon-desc" className="mb-4">
                <div className="text-3xl font-extrabold tracking-tight text-gray-900">
                  최대 ₩10,000 즉시 할인
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  여름 시즌 한정. 일부 카테고리 제외, 자세한 조건은 쿠폰함에서
                  확인.
                </p>
              </div>

              <div className="mb-5">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>남은 수량</span>
                  <span>42 / 200</span>
                </div>
                <div className="overflow-hidden mt-1 w-full h-2 bg-gray-100 rounded-full">
                  <div className="h-full w-[21%] rounded-full bg-gradient-to-r from-teal-400 to-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <button className="inline-flex col-span-2 gap-2 justify-center items-center px-4 h-12 text-base font-semibold text-white bg-gradient-to-r from-teal-400 to-blue-500 rounded-xl shadow-lg transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300">
                  지금 발급
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="inline-flex justify-center items-center px-4 h-11 text-sm font-medium text-gray-700 bg-white rounded-xl border border-gray-200 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                >
                  나중에
                </button>
                <button
                  onClick={onClose}
                  className="inline-flex justify-center items-center px-4 h-11 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl border border-transparent transition hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                >
                  닫기
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
