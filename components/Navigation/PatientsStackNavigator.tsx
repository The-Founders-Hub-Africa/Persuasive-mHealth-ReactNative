import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PatientDetailsScreen from "@/screens/(dashboard)/PatientDetailsScreen";
import PatientsScreen from "@/screens/(dashboard)/PatientsScreen";
import theme from "@/styles/theme";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import NewPatientScreen from "@/screens/(dashboard)/NewPatientScreen";
import EditPatientScreen from "@/screens/(dashboard)/EditPatientScreen";
import { get_id, get_name } from "@/integrations/axios_store";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();

const PatientsStackNavigator = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleNewPatient = () => {
    navigation.navigate("Patients", { screen: "New Patient" });
  };

  const handleEditPatient = (route: any) => {
    let id = get_id(route.params);
    let name = get_name(route.params);
    navigation.navigate("Patients", {
      screen: "Edit Patient",
      params: {
        id: id,
        name: name,
      },
    });
  };

  return (
    <Stack.Navigator
      screenOptions={{ headerShadowVisible: false }}
      initialRouteName="Patients">
      <Stack.Screen
        name="Patients"
        component={PatientsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleNewPatient}>
              <Feather
                name="plus"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Patient Details"
        options={({ route }) => {
          let name = get_name(route.params);

          return {
            title: `${name} details`,
            headerRight: () => (
              <TouchableOpacity onPress={() => handleEditPatient(route)}>
                <MaterialCommunityIcons
                  name="clipboard-edit-outline"
                  size={24}
                  color={theme.colors["neutral-700"]}
                />
              </TouchableOpacity>
            ),
          };
        }}
        component={PatientDetailsScreen}
      />
      <Stack.Screen name="New Patient" component={NewPatientScreen} />
      <Stack.Screen
        name="Edit Patient"
        options={({ route }) => {
          let name = get_name(route.params);

          return {
            title: `${name} (Edit)`,
          };
        }}
        component={EditPatientScreen}
      />
    </Stack.Navigator>
  );
};

export default PatientsStackNavigator;
