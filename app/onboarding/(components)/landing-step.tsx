import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { ItemProps } from "./onboarding-item";

export function LandingStep({ item }: { item: ItemProps }) {
  return (
    <>
      {item.image && (
        <View style={styles.imgContainer}>
          <Image source={item.image} style={{ width: "100%", height: 280 }} />
        </View>
      )}
      <View style={styles.textCOntainer}>
        <Text variant="headlineLarge">{item.title}</Text>
        <Text variant="bodyLarge" style={{ marginTop: 10 }}>
          {item.text}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  textCOntainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
});
