import { View, StyleSheet } from "react-native";

type SpacerProps = {
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  children?: React.ReactNode;
};

export function Spacer({
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  children,
}: SpacerProps) {
  const styles = StyleSheet.create({
    spacer: {
      marginTop: marginTop,
      marginLeft: marginLeft,
      marginRight: marginRight,
      marginBottom: marginBottom,
      width: "100%",
    },
  });

  return <View style={styles.spacer}>{children}</View>;
}
