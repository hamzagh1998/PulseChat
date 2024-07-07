import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export function SplashScreen() {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, [animation]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 180],
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.imgContainer}
        source={require("../assets/images/signal.png")}
      />
      <View style={styles.loaderContainer}>
        <Animated.View
          style={[
            styles.horizontalLoader,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imgContainer: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  loaderContainer: {
    width: 180,
    height: 4,
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
    borderRadius: 2,
    marginTop: 20,
  },
  horizontalLoader: {
    position: "absolute", // Add this line
    width: 100,
    height: 4,
    backgroundColor: "#7289da",
  },
});
