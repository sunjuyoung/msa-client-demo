import React from "react";
import UserProfile from "../components/common/UserProfile";

const UserExamplePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Zustand 사용자 상태 관리 예제
          </h1>
          <p className="text-gray-600 text-lg">
            이 페이지는 Zustand를 사용한 사용자 상태 관리의 예제입니다. 임시
            사용자 데이터로 로그인하고 프로필을 관리할 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              사용자 프로필
            </h2>
            <UserProfile />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              사용법 가이드
            </h2>
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">
                  1. 임시 사용자 데이터로 시작
                </h3>
                <p className="text-gray-600 text-sm">
                  "임시 사용자 데이터로 시작" 버튼을 클릭하면 미리 정의된 사용자
                  정보로 로그인됩니다.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">
                  2. 로그인/로그아웃
                </h3>
                <p className="text-gray-600 text-sm">
                  "로그인 (임시)" 버튼으로 로그인하고, "로그아웃" 버튼으로
                  로그아웃할 수 있습니다.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">
                  3. 사용자 정보 수정
                </h3>
                <p className="text-gray-600 text-sm">
                  이름 옆의 "수정" 버튼을 클릭하여 사용자 이름을 변경할 수
                  있습니다.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">
                  4. 상태 지속성
                </h3>
                <p className="text-gray-600 text-sm">
                  Zustand의 persist 미들웨어를 사용하여 사용자 상태가
                  localStorage에 저장됩니다. 페이지를 새로고침해도 로그인 상태가
                  유지됩니다.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">
                  코드에서 사용하는 방법:
                </h4>
                <pre className="text-xs text-blue-700 bg-blue-100 p-2 rounded overflow-x-auto">
                  {`// 전체 스토어 사용
const { login, logout, updateUser } = useUserStore();

// 특정 상태만 사용
const user = useUser();
const isAuthenticated = useIsAuthenticated();
const isLoading = useIsLoading();`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserExamplePage;
