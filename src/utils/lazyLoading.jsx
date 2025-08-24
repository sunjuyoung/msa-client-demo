import React from "react";

// Named export를 안전하게 lazy loading하는 함수
export const createLazyComponent = (importFunc, exportName = "default") => {
  return React.lazy(() =>
    importFunc().then((module) => {
      // exportName이 'default'인 경우
      if (exportName === "default") {
        return { default: module.default || module };
      }
      // named export인 경우
      if (module[exportName]) {
        return { default: module[exportName] };
      }
      // fallback: default export가 있으면 사용, 없으면 첫 번째 export 사용
      return { default: module.default || Object.values(module)[0] };
    })
  );
};

// 에러 처리가 포함된 lazy loading
export const createSafeLazyComponent = (importFunc, exportName = "default") => {
  return React.lazy(() =>
    importFunc()
      .then((module) => {
        if (exportName === "default") {
          return { default: module.default || module };
        }
        if (module[exportName]) {
          return { default: module[exportName] };
        }
        return { default: module.default || Object.values(module)[0] };
      })
      .catch((error) => {
        console.error("Lazy loading failed:", error);
        // 에러 발생 시 기본 컴포넌트 반환
        return {
          default: () => (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <h3>컴포넌트를 불러올 수 없습니다.</h3>
              <p>페이지를 새로고침해주세요.</p>
            </div>
          ),
        };
      })
  );
};
