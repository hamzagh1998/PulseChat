import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type HeaderCardProps = {
  title: string;
  subtitle: string;
};

export function HeaderCard({ title, subtitle }: HeaderCardProps) {
  return (
    <View style={styles.container}>
      <Image
        style={[styles.imgContainer, { height: 180 }]}
        source={require("../../../assets/images/unsplash.jpg")}
      />
      <View style={styles.contentContainer}>
        <Text
          variant="headlineLarge"
          style={{ fontWeight: "bold", marginBottom: 8, color: "white" }}
        >
          {title}
        </Text>
        <Text style={{ color: "lightgray" }}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imgContainer: {
    width: "100%",
    opacity: 0.8,
    zIndex: 1,
  },
  contentContainer: {
    position: "absolute",
    top: 82,
    left: 0,
    paddingLeft: 16,
    width: "100%",
    zIndex: 2,
  },
});
