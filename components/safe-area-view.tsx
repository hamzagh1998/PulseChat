import React from "react";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export function SafeAreaViewContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={containerStyle(colors.background)}>
      {children}
    </SafeAreaView>
  );
}

const containerStyle = (bgColor: string) => ({
  flex: 1,
  backgroundColor: bgColor,
  padding: 12,
});
