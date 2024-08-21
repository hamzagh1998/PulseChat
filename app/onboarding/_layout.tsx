import React from "react";
import { Slot } from "expo-router";
import { View } from "react-native";

import { useTheme } from "react-native-paper";

export default function Index() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Slot />
    </View>
  );
}
