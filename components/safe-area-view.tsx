import React from "react";
import { useTheme } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export function SafeAreaViewContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView style={containerStyle(colors.background, top)}>
      {children}
    </SafeAreaView>
  );
}

const containerStyle = (bgColor: string, pt: number) => ({
  flex: 1,
  backgroundColor: bgColor,
  padding: 12,
  paddingTop: pt,
});
