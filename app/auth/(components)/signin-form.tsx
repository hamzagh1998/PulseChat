import { Spacer } from "@/components/spacer";
import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Button, Divider, Text, TextInput, useTheme } from "react-native-paper";

export function SigninForm() {
  const colors = useTheme().colors;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.rowContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity>
          <Text variant="bodyLarge" style={{ color: colors.primary }}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
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
        <Spacer marginBottom={12}>
          <TouchableOpacity>
            <Text
              variant="labelSmall"
              style={{ textAlign: "right", color: colors.primary }}
            >
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </Spacer>
        <Spacer marginBottom={12} marginTop={24}>
          <Button
            textColor="#fff"
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Sign in
          </Button>
        </Spacer>
        <Spacer marginBottom={12} marginTop={12}>
          <View style={styles.rowContainer}>
            <Divider style={styles.divider} />
            <Text variant="labelSmall" style={styles.dividerText}>
              Or Sign in with
            </Text>
            <Divider style={styles.divider} />
          </View>
        </Spacer>
        <Button
          style={{ width: "100%" }}
          textColor="#000"
          buttonColor="#fff"
          mode="outlined"
          onPress={() => console.log("Pressed")}
          icon="google"
        >
          Google
        </Button>
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

export default SigninForm;
