import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { SplashScreen } from "@/components/splash-screen";

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
      router.replace("/auth/signin");
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
