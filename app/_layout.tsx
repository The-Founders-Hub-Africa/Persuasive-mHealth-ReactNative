import { Stack } from "expo-router";
import React from "react";
// import OnboardingScreen from "@/screens/OnboardingScreen";
// import SignupScreen from "@/app/(auth)/SignupScreen";
// import LoginScreen from "@/app/(auth)/LoginScreen";
// import ResetPasswordScreen from "@/app/(auth)/ResetPasswordScreen";
// import ForgotPasswordScreen from "@/app/(auth)/ForgotPasswordScreen";
// import OTPVerificationScreen from "@/app/(auth)/OTPVerificationScreen";
// import ProfileSetupScreen from "@/app/(dashboard)/ProfileSetupScreen";
// import BottomTabs from "@/components/Navigation/BottomTabs";
import { Provider } from "react-redux";
import { store } from "@/integrations/store";
// import AnalyticsScreen from "@/app/analytics";
import ToastManager from "toastify-react-native";
import Alert_System from "@/integrations/features/alert/Alert";
// import DecisionScreen from "@/screens/decisionscreen";


export default function RootLayout() {
  return (
    <Provider store={store}>
        <ToastManager textStyle={{ fontSize: 16, width: "100%" }} />

        <Stack
         screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen
            name="decision"
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
            name="OTPVerification"
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
            name="forgotpassword"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="resetPassword"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="profileSetup"
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
        </Stack>
        <Alert_System />
    </Provider>
  );
}

