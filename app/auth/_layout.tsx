import { Slot, useSegments } from "expo-router";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { HeaderCard } from "./(components)/header-card";
import { SafeAreaViewContainer } from "@/components/safe-area-view";

export default function Index() {
  const { colors } = useTheme();
  const segments = useSegments();

  let title = "Welcome Back";
  let subtitle = "Sign in to your account";

  if (segments.includes("signup")) {
    title = "Join Us Today";
    subtitle = "Sign up to get started";
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HeaderCard title={title} subtitle={subtitle} />
      <SafeAreaViewContainer>
        <Slot />
      </SafeAreaViewContainer>
    </View>
  );
}
