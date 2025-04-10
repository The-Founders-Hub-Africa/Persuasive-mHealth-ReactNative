import { View } from "react-native";
import React from "react";
import SectionHeader from "../common/SectionHeader";
import { AppointmentProps } from "@/types";
import AppointmentsList from "../common/AppointmentsList";
import { useRouter } from "expo-router";

const RecentAppointments = ({
  appointmentsData,
}: {
  appointmentsData: AppointmentProps[];
}) => {
  const navigation = useRouter();
  return (
    <View
      style={{
        gap: 16,
        width: "100%",
      }}>
      <SectionHeader
        title="Upcoming Appointments"
        onPress={() => navigation.navigate("../appointments")}
      />

      <AppointmentsList appointmentsData={appointmentsData.slice(0, 3)} />
    </View>
  );
};

export default RecentAppointments;
