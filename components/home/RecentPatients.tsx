import { View } from "react-native";
import React from "react";
import PatientList from "../common/PatientList";
import SectionHeader from "../common/SectionHeader";
import { PatientProps } from "@/types";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const RecentPatients = ({ patientsData }: { patientsData: PatientProps[] }) => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View
      style={{
        gap: 16,
        width: "100%",
      }}>
      <SectionHeader
        title="Recent Patients"
        onPress={() => navigation.navigate("Patients")}
      />

      <PatientList patientsData={patientsData.slice(0, 3)}  />
    </View>
  );
};

export default RecentPatients;
