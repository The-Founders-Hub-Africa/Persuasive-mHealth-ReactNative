import { Stack } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/integrations/store";
import ToastManager from "toastify-react-native";
import Alert_System from "@/integrations/features/alert/Alert";


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
            name="onBoarding"
            options={{
              headerShadowVisible: false,
              headerTitle: "",
            }}
          />

          <Stack.Screen
            name="signUp"
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
            name="forgotPassword"
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
        </Stack>
        <Alert_System />
    </Provider>
  );
}

