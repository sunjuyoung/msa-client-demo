import { create } from "zustand";
import { persist } from "zustand/middleware";

// 임시 사용자 데이터
const mockUserData = {
  id: "1",
  email: "user@example.com",
  name: "홍길동",
  phone: "010-1234-5678",
  address: {
    zipCode: "12345",
    address1: "서울특별시 강남구",
    address2: "테헤란로 123",
    detail: "456동 789호",
  },

  createdAt: "2024-01-01T00:00:00.000Z",
  lastLoginAt: "2024-12-19T10:00:00.000Z",
};

// 사용자 스토어
export const useUserStore = create(
  persist(
    (set, get) => ({
      // 상태
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // 액션
      // 사용자 로그인
      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          // 임시 로그인 로직 (실제로는 API 호출)
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // 임시 사용자 데이터로 로그인
          set({
            user: mockUserData,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return { success: true };
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
          });
          return { success: false, error: error.message };
        }
      },

      // 사용자 로그아웃
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // 사용자 정보 업데이트
      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
          });
        }
      },

      // 주소 업데이트
      updateAddress: (address) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              address: { ...currentUser.address, ...address },
            },
          });
        }
      },

      // 에러 초기화
      clearError: () => {
        set({ error: null });
      },

      // 임시 사용자 데이터로 초기화 (개발용)
      initializeWithMockData: () => {
        set({
          user: mockUserData,
          isAuthenticated: true,
        });
      },
    }),
    {
      name: "user-storage", // localStorage 키
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// 선택자 함수들
export const useUser = () => useUserStore((state) => state.user);
export const useIsAuthenticated = () =>
  useUserStore((state) => state.isAuthenticated);
export const useIsLoading = () => useUserStore((state) => state.isLoading);
export const useUserError = () => useUserStore((state) => state.error);
