import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { storage } from "@/hooks/store/mkkv-store";

import { SplashScreen } from "@/components/splash-screen";

import { AUTH, ONBOARDING } from "@/constants/routes";

export default function Index() {
  const { colors } = useTheme();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      setInitializing(false);
    });

    return () => {
      subscriber();
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setInitializing(false);
    }, 2000); // Set initializing to false after 5 seconds

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!initializing && !user) {
      const isOnboardingCompleted = storage.getBoolean("isOnboardingCompleted");
      if (isOnboardingCompleted) {
        router.replace(AUTH);
      } else {
        router.replace(ONBOARDING);
      }
    }
  }, [initializing, user]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <SplashScreen />
    </View>
  );
}
