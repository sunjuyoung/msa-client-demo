import React from "react";
import {
  useUserStore,
  useUser,
  useIsAuthenticated,
  useIsLoading,
} from "../../shared/state/userStore";

const UserProfile = () => {
  const { login, logout, updateUser, initializeWithMockData } = useUserStore();
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useIsLoading();

  const handleLogin = async () => {
    const result = await login("user@example.com", "password123");
    if (result.success) {
      console.log("로그인 성공!");
    }
  };

  const handleLogout = () => {
    logout();
    console.log("로그아웃 완료");
  };

  const handleUpdateName = () => {
    const newName = prompt("새로운 이름을 입력하세요:", user?.name);
    if (newName && newName.trim()) {
      updateUser({ name: newName.trim() });
    }
  };

  const handleInitializeMockData = () => {
    initializeWithMockData();
    console.log("임시 사용자 데이터로 초기화 완료");
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-center mt-2 text-blue-600">로딩 중...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          사용자 로그인
        </h2>
        <div className="space-y-3">
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            로그인 (임시)
          </button>
          <button
            onClick={handleInitializeMockData}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            임시 사용자 데이터로 시작
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg border shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">사용자 프로필</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
        >
          로그아웃
        </button>
      </div>

      {user && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이름
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900">{user.name}</span>
                <button
                  onClick={handleUpdateName}
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  수정
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <span className="text-gray-900">{user.email}</span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                전화번호
              </label>
              <span className="text-gray-900">{user.phone}</span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                가입일
              </label>
              <span className="text-gray-900">
                {new Date(user.createdAt).toLocaleDateString("ko-KR")}
              </span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              주소 정보
            </h3>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-700">
                {user.address.zipCode} {user.address.address1}{" "}
                {user.address.address2}
              </p>
              <p className="text-gray-700">{user.address.detail}</p>
            </div>
          </div>

                     <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              최근 활동
            </h3>
            <p className="text-gray-700">
              마지막 로그인:{" "}
              {new Date(user.lastLoginAt).toLocaleString("ko-KR")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
