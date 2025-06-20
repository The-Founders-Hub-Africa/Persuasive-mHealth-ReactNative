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
          
           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <Alert_System />
       
    </Provider>
  );
}

// navigation.getId is not a function