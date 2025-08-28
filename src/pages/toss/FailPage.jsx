import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function FailPage() {
  const [searchParams] = useSearchParams();

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
        id="info"
        className="box_section"
        style={{
          width: "600px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <img
          width="100px"
          src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
          alt="에러 이미지"
        />
        <h2>결제를 실패했어요</h2>

        <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
          <div className="p-grid-col text--left">
            <b>에러메시지</b>
          </div>
          <div className="p-grid-col text--right" id="message">
            {searchParams.get("message") || "N/A"}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>에러코드</b>
          </div>
          <div className="p-grid-col text--right" id="code">
            {searchParams.get("code") || "N/A"}
          </div>
        </div>

        <div className="p-grid-col">
          <Link to="https://docs.tosspayments.com/guides/payment-widget/integration">
            <button className="button p-grid-col5">연동 문서</button>
          </Link>
          <Link to="https://discord.gg/A4fRFXQhRu">
            <button
              className="button p-grid-col5"
              style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}
            >
              실시간 문의
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
