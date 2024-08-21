import { Animated, StyleSheet, View, useWindowDimensions } from "react-native";

import { ItemProps } from "@/app/onboarding/(components)/onboarding-item";
import { Button } from "react-native-paper";

export function Paginator({
  items,
  scrollx,
  currentIndex,
  onNavigate,
}: {
  items: ItemProps[];
  scrollx: Animated.Value;
  currentIndex: number;
  onNavigate: (direction: "right" | "left") => void;
}) {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        height: 64,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        icon="chevron-left"
        mode="text"
        disabled={currentIndex === 0}
        onPress={() => onNavigate("left")}
      >
        Previous
      </Button>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {items.map((item, idx) => {
          const inputRange = [
            (idx - 1) * width,
            idx * width,
            (idx + 1) * width,
          ];
          const dotWidth = scrollx.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: "clamp",
          });
          const opacity = scrollx.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              style={[styles.dot, { width: dotWidth, opacity }]}
              key={item.label}
            />
          );
        })}
      </View>
      <Button
        icon="chevron-right"
        mode="text"
        disabled={currentIndex === items.length - 1}
        contentStyle={{ flexDirection: "row-reverse" }}
        onPress={() => onNavigate("right")}
      >
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgb(182, 196, 255)",
    marginHorizontal: 8,
  },
});
