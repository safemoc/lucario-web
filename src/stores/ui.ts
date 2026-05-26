import { create } from "zustand";

type UiState = {
  commandOpen: boolean;
  notificationOpen: boolean;
  mobileNavOpen: boolean;
  setCommandOpen: (v: boolean) => void;
  setNotificationOpen: (v: boolean) => void;
  setMobileNavOpen: (v: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  commandOpen: false,
  notificationOpen: false,
  mobileNavOpen: false,
  setCommandOpen: (commandOpen) => set({ commandOpen }),
  setNotificationOpen: (notificationOpen) => set({ notificationOpen }),
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
}));
