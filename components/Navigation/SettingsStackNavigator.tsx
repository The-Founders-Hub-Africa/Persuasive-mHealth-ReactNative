import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewProfileScreen from "@/screens/(dashboard)/ViewProfileScreen";
import EditProfileScreen from "@/screens/(dashboard)/EdEditProfileScreenitProfile";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import theme from "@/styles/theme";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import SettingsScreen from "@/screens/(dashboard)/SettingsScreen";
import SecurityScreen from "@/screens/(dashboard)/SecurityScreen";
import OldPasswordScreen from "@/screens/(dashboard)/OldPasswordScreen";
import ResetPasswordScreen from "@/screens/(dashboard)/ResetPasswordScreen";
import NotificationSettingsScreen from "@/screens/(dashboard)/NotificationSettingsScreen";
import FAQScreen from "@/screens/(dashboard)/FAQScreen";
import PrivacyPolicyScreen from "@/screens/(dashboard)/PrivacyPolicyScreen";
import TermsScreen from "@/screens/(dashboard)/SupportScreen";
import SupportScreen from "@/screens/(dashboard)/SupportScreen";

const Stack = createNativeStackNavigator();

const SettingsStackNavigator = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleEditProfile = () => {
    navigation.navigate("Settings", { screen: "Edit Profile" });
  };

  const handleViewProfile = () => {
    navigation.navigate("Settings", { screen: "View Profile" });
  };

  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen
        name="View Profile"
        component={ViewProfileScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleEditProfile}>
              <MaterialCommunityIcons
                name="clipboard-edit-outline"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleViewProfile}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Security" component={SecurityScreen} />
      <Stack.Screen
        name="Old Password"
        component={OldPasswordScreen}
        options={{
          title: "Change Password",
        }}
      />
      <Stack.Screen
        name="Reset Password"
        component={ResetPasswordScreen}
        options={{
          title: "Change Password",
        }}
      />
      <Stack.Screen
        name="Notification Settings"
        component={NotificationSettingsScreen}
      />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="Privacy & Policy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="Terms & Conditions" component={TermsScreen} />
      <Stack.Screen name="Support & Legal" component={SupportScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
