import { ImageSourcePropType, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "react-native-paper";

import { LandingStep } from "./landing-step";

export type ItemProps = {
  key: number;
  title: string;
  text: string;
  image?: ImageSourcePropType;
  label: string;
};

export function OnboardingItem({ item }: { item: ItemProps }) {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        width,
        paddingTop: top,
        paddingHorizontal: 15,
      }}
    >
      {item.label === "welcome" && <LandingStep item={item} />}
      {item.label === "permissions" && <Text>Permissions</Text>}
    </View>
  );
}
