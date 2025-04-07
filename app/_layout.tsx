import { Stack } from "expo-router";
import React from "react";
import OnboardingScreen from "@/screens/OnboardingScreen";
import SignupScreen from "@/screens/(auth)/SignupScreen";
import LoginScreen from "@/screens/(auth)/LoginScreen";
import ResetPasswordScreen from "@/screens/(auth)/ResetPasswordScreen";
import ForgotPasswordScreen from "@/screens/(auth)/ForgotPasswordScreen";
import OTPVerificationScreen from "@/screens/(auth)/OTPVerificationScreen";
import ProfileSetupScreen from "@/screens/(dashboard)/ProfileSetupScreen";
import BottomTabs from "@/components/Navigation/BottomTabs";
import { Provider } from "react-redux";
import { store } from "@/integrations/store";
import AnalyticsScreen from "@/screens/(dashboard)/AnalyticsScreen";
import ToastManager from "toastify-react-native";
import Alert_System from "@/integrations/features/alert/Alert";
import DecisionScreen from "@/screens/decisionscreen";


export default function RootLayout() {
  return (
    <Provider store={store}>
        <ToastManager textStyle={{ fontSize: 16, width: "100%" }} />

          <Stack.Screen
            name="DecisionScreen"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />

          <Stack.Screen
            name="Onboarding"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />

          
          <Stack.Screen
            name="Signup"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="OTP Verification"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="Login"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="Forgot Password"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="Reset Password"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="Profile Setup"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="Analytics"
            options={{
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            options={{
              headerShown: false,
            }}
          />
        <Alert_System />
    </Provider>
  );
}

