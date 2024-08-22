import { ImageSourcePropType, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LandingStep } from "./landing-step";
import { PhoneNumStep } from "./phone-num-step";
import { PermissionsStep } from "./permissions-step";

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
      {item.label === "permissions" && <PermissionsStep item={item} />}
      {item.label === "phone-num" && <PhoneNumStep item={item} />}
    </View>
  );
}
