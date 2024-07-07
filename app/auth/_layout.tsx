import { SafeAreaVew } from "@/components/safe-area-view";
import { Slot } from "expo-router";

export default function Index() {
  return (
    <SafeAreaVew>
      <Slot />
    </SafeAreaVew>
  );
}
