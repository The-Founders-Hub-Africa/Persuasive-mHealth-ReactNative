import { Stack } from "expo-router";
import React from "react";
import OnboardingScreen from "@/screens/OnboardingScreen";
import SignupScreen from "@/screens/(auth)/SignupScreen";
import LoginScreen from "@/screens/(auth)/LoginScreen";
import ResetPasswordScreen from "@/screens/(auth)/ResetPasswordScreen";
import ForgotPasswordScreen from "@/screens/(auth)/ForgotPasswordScreen";
import OTPVerificationScreen from "@/screens/(auth)/OTPVerificationScreen";
import ProfileSetupScreen from "@/app/(dashboard)/ProfileSetupScreen";
import BottomTabs from "@/components/Navigation/BottomTabs";
import { Provider } from "react-redux";
import { store } from "@/integrations/store";
import AnalyticsScreen from "@/app/analytics";
import ToastManager from "toastify-react-native";
import Alert_System from "@/integrations/features/alert/Alert";
import DecisionScreen from "@/screens/decisionscreen";


export default function RootLayout() {
  return (
    <Provider store={store}>
        <ToastManager textStyle={{ fontSize: 16, width: "100%" }} />

          <Stack.Screen
            name="decision-screen"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />

          <Stack.Screen
            name="onboarding"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />

          
          <Stack.Screen
            name="signup"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="otp-verification"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="forgot-password"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="reset-password"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="profile-setup"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="analytics"
            options={{
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="dashboard"
            options={{
              headerShown: false,
            }}
          />
        <Alert_System />
    </Provider>
  );
}

