import React  from "react";
import { AppointmentProps } from "@/types";
import { useNavigation, NavigationProp } from "@react-navigation/native";
// import Alert_System from "@/src/integrations/features/alert/Alert";
import AppointmentCard from "./AppointmentCard";
import { View } from "react-native";



const AppointmentsList = ({
  appointmentsData,
}: {
  appointmentsData: AppointmentProps[];
  }) => {
  
    const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View
      style={{
        gap: 4,
        width: "100%",
      }}>
      {appointmentsData.map(appointment => (
        <AppointmentCard key={appointment.id} appointment={appointment} appointmentPage = {false} />
      ))}
    </View>
  );
};

export default AppointmentsList;