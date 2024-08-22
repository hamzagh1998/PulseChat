import { useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, View, ViewToken } from "react-native";

import { OnboardingItem } from "./(components)/onboarding-item";
import { Paginator } from "@/components/paginator";

const slides = [
  {
    key: 1,
    title: "Welcome to PulseChat",
    text: "Connect, share, and chat privately. Your conversations, just a heartbeat away.",
    image: require("../../assets/images/welcome.png"),
    label: "welcome",
  },
  {
    key: 2,
    title: "Allow permissions",
    text: "To help us set up your account, and help you find people you know faster. PulseChat will request these permissions.",
    label: "permissions",
  },
  {
    key: 3,
    title: "Register your account",
    text: "Enter your full name and phone number to get started",
    label: "phone-num",
  },
  {
    key: 4,
    title: "Security pin",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    label: "pin",
  },
];

export default function OnboardingSlider() {
  const scrollx = useRef(new Animated.Value(0)).current;
  const slideRef = useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]) setCurrentIndex(viewableItems[0].index!);
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const onNavigate = (direction: "right" | "left") => {
    if (currentIndex < slides.length - 1 && direction === "right") {
      slideRef.current!.scrollToIndex({ index: currentIndex + 1 });
    } else if (currentIndex > 0 && direction === "left") {
      slideRef.current!.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          ref={slideRef}
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.title}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollx } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
        />
      </View>
      <Paginator
        items={slides}
        scrollx={scrollx}
        currentIndex={currentIndex}
        onNavigate={onNavigate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
