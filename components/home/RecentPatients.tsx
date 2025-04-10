import { View } from "react-native";
import React from "react";
import PatientList from "../common/PatientList";
import SectionHeader from "../common/SectionHeader";
import { PatientProps } from "@/types";
import { useRouter } from "expo-router";

const RecentPatients = ({ patientsData }: { patientsData: PatientProps[] }) => {
  const navigation = useRouter();

  return (
    <View
      style={{
        gap: 16,
        width: "100%",
      }}>
      <SectionHeader
        title="Recent Patients"
        onPress={() => navigation.navigate("../patients")}
      />

      <PatientList patientsData={patientsData.slice(0, 3)}  />
    </View>
  );
};

export default RecentPatients;
