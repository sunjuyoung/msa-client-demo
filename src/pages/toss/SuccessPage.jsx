import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { API_SERVER_HOST } from "../../api/rootApi";

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState(null);
  const [countdown, setCountdown] = useState(5);

  const orderId = searchParams.get("orderId") || "";
  const amount = searchParams.get("amount") || "0";
  const paymentKey = searchParams.get("paymentKey") || "";

  useEffect(() => {
    let isMounted = true;

    // 결제 확인 API 호출
    const confirmPayment = async () => {
      try {
        if (!orderId || !amount || !paymentKey) {
          console.log("Missing payment parameters");
          return;
        }

        const response = await fetch(
          `${API_SERVER_HOST}/order-payment-service/payments/confirm`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId,
              amount,
              paymentKey,
            }),
          }
        );

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.message || "Payment confirmation failed");
        }

        if (isMounted) {
          setResponseData(json);
        }
      } catch (error) {
        console.error("Payment confirmation error:", error);
        if (isMounted) {
          navigate(`/fail?message=${encodeURIComponent(error.message)}`);
        }
      }
    };

    confirmPayment();

    // 5초 후 홈으로 이동
    const timer = setTimeout(() => {
      if (isMounted) {
        navigate("/");
      }
    }, 5000);

    // 카운트다운
    const interval = setInterval(() => {
      if (isMounted) {
        setCountdown((prev) => {
          const newCount = prev - 1;
          return newCount <= 0 ? 0 : newCount;
        });
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [orderId, amount, paymentKey, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "600px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <img
            width="100px"
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
            alt="결제 완료"
          />
        </div>

        <h1 style={{ color: "#333", marginBottom: "10px" }}>
          결제를 완료했어요
        </h1>
        <p style={{ color: "#666", marginBottom: "30px" }}>
          홈 페이지로 {countdown}초 후 이동합니다.
        </p>

        <div style={{ textAlign: "left", marginBottom: "30px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span style={{ fontWeight: "bold" }}>결제금액</span>
            <span style={{ color: "#007bff", fontWeight: "bold" }}>
              {parseInt(amount).toLocaleString()}원
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span style={{ fontWeight: "bold" }}>주문번호</span>
            <span>{orderId}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Payment Key</span>
            <span
              style={{
                wordBreak: "break-all",
                maxWidth: "250px",
                fontSize: "12px",
              }}
            >
              {paymentKey}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <a
            href="https://docs.tosspayments.com/guides/v2/payment-widget/integration"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            연동 문서
          </a>
          <a
            href="https://discord.gg/A4fRFXQhRu"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "10px 20px",
              backgroundColor: "#e8f3ff",
              color: "#1b64da",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            실시간 문의
          </a>
        </div>
      </div>

      {responseData && (
        <div
          style={{
            width: "600px",
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginTop: "20px",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>API 응답 데이터</h3>
          <pre
            style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "4px",
              overflow: "auto",
              fontSize: "12px",
              lineHeight: "1.4",
            }}
          >
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
