import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification, MOCK_NOTIFICATIONS } from "@/lib/mockData/notifications";

interface NotificationsState {
  items: Notification[];
}

const initialState: NotificationsState = {
  items: MOCK_NOTIFICATIONS,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      const notif = state.items.find((n) => n.id === action.payload);
      if (notif) notif.read = true;
    },
    markAllAsRead: (state) => {
      state.items.forEach((n) => {
        n.read = true;
      });
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((n) => n.id !== action.payload);
    },
  },
});

export const { markAsRead, markAllAsRead, deleteNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
