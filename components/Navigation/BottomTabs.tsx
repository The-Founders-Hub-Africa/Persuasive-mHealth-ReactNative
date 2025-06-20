import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
// import HomeStackNavigator from "./HomeStackNavigator";
// import AppointmentsStackNavigator from "./AppointmentsStackNavigator";
// import PatientsStackNavigator from "./PatientsStackNavigator";
// import MessagesStackNavigator from "./MessagesStackNavigator";
// import SettingsStackNavigator from "./SettingsStackNavigator";
import theme from "@/styles/theme";
import HomeScreen from "@/app/(dashboard)/home";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Patients") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Appointments") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Messages") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return (
            <Ionicons
              name={iconName as keyof typeof Ionicons.glyphMap}
              size={24}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#6200EE",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
      })}>
      {/* <Tab.Screen name="Home"  />
      <Tab.Screen name="Patients" />
      <Tab.Screen name="Appointments"  />
      <Tab.Screen name="Messages"  />
      <Tab.Screen name="Settings"  />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      /> */}
    {/* </Tab> */}
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    margin: 28,
    bottom: 28,
    left: 28,
    right: 28,
    height: 80,
    borderRadius: 16,
    backgroundColor: theme.colors.white,
    shadowColor: "#0000001A",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  tabBarItem: {
    paddingVertical: 10,
  },
});

export default BottomTabs;
