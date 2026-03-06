import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
}

const initialState: UIState = {
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    toggleMobileSidebar: (state) => {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },
    closeMobileSidebar: (state) => {
      state.mobileSidebarOpen = false;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  toggleMobileSidebar,
  closeMobileSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;
