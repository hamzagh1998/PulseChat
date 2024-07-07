import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";

import { useThemeStore } from "@/hooks/store/use-theme-store";

import { lightTheme, darkTheme } from "@/themes/";

export default function Index() {
  const theme = useThemeStore((state) => state.theme);
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <PaperProvider theme={currentTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </PaperProvider>
  );
}
