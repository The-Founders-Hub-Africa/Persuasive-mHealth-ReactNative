import React from "react";
import { AppointmentProps } from "@/types";
// import Alert_System from "@/src/integrations/features/alert/Alert";
import AppointmentCard from "./AppointmentCard";
import { View, Text } from "react-native";



const AppointmentsList = ({
  appointmentsData,
}: {
  appointmentsData: AppointmentProps[];
  }) => {
  
  return (
    <View
      style={{
        gap: 4,
        width: "100%",
      }}>
      {appointmentsData.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 32 }}>
          <Text style={{ color: "#888" }}>No appointments to show yet.</Text>
        </View>
      ) : (
        appointmentsData.map(appointment => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            appointmentPage={false}
          />
        ))
      )}
    </View>
  );
};

export default AppointmentsList;