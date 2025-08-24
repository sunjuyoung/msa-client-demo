import { create } from "zustand";

export const useSearchStore = create((set) => ({
  query: "",
  recent: [],
  isMobileOpen: false,
  setQuery: (q) => set({ query: q }),
  addRecent: (q) =>
    set((state) => ({
      recent: [q, ...state.recent.filter((r) => r !== q)].slice(0, 10),
    })),
  clearRecent: () => set({ recent: [] }),
  openMobile: () => set({ isMobileOpen: true }),
  closeMobile: () => set({ isMobileOpen: false }),
}));
