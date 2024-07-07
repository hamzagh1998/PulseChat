import { TouchableOpacity } from "react-native";
import { ToggleButton } from "react-native-paper";

import { useThemeStore } from "@/hooks/store/use-theme-store";

export function ThemeToggleButton() {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <TouchableOpacity>
      <ToggleButton
        icon={theme === "dark" ? "white-balance-sunny" : "moon-waning-crescent"}
        onPress={toggleTheme}
      />
    </TouchableOpacity>
  );
}
