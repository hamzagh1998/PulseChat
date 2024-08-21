import { useState } from "react";
import { router } from "expo-router";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Button, Divider, Text, TextInput, useTheme } from "react-native-paper";

import { Spacer } from "@/components/spacer";

export function SigninForm() {
  const colors = useTheme().colors;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.rowContainer}></View>
      <View style={styles.inner}>
        <Spacer marginBottom={24} marginTop={24}>
          <Text variant="labelSmall">Email*</Text>
          <TextInput
            style={{ width: "100%" }}
            textContentType="emailAddress"
            placeholder="John@Doe.example.com"
            mode="outlined"
            right={<TextInput.Icon icon="close" onPress={() => null} />}
          />
        </Spacer>
        <Spacer marginBottom={12} marginTop={24}>
          <Text variant="labelSmall">Password*</Text>
          <TextInput
            style={{ width: "100%" }}
            textContentType="password"
            placeholder="******"
            mode="outlined"
            secureTextEntry={!showPassword}
            right={
              showPassword ? (
                <TextInput.Icon
                  icon="eye-off"
                  onPress={() => setShowPassword(false)}
                />
              ) : (
                <TextInput.Icon
                  icon="eye"
                  onPress={() => setShowPassword(true)}
                />
              )
            }
          />
        </Spacer>
        <Spacer marginBottom={12} marginTop={24}>
          <Button
            textColor="#fff"
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Enter
          </Button>
        </Spacer>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  inner: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 8,
  },
});
