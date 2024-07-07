import { create } from "zustand";

import { storage } from "./mkkv-store";
import { Appearance } from "react-native";

type ThemeState = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

const colorScheme = Appearance.getColorScheme();

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (storage.getString("theme") as "light" | "dark") || colorScheme,
  setTheme: (theme: "light" | "dark") => {
    storage.set("theme", theme);
    set({ theme });
  },
}));
