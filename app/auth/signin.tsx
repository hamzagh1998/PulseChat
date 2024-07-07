import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { HeaderCard } from "./(components)/header-card";
import { SigninForm } from "./(components)/signin-form";
import { SafeAreaViewContainer } from "@/components/safe-area-view";

export default function SigninPage() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <HeaderCard title="Welcome Back" subtitle="Sign in to your account" />
      <SafeAreaViewContainer>
        <SigninForm />
      </SafeAreaViewContainer>
    </KeyboardAvoidingView>
  );
}
