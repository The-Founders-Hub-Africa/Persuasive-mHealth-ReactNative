import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import theme, { calendarTheme } from "@/styles/theme";
import { Entypo, Feather } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import SectionHeader from "../common/SectionHeader";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { convertDate } from "@/integrations/axios_store";

const AppointmentCalendar = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const appointment = useAppSelector(state => state.appointments.data);
  const pendings = appointment.filter(data => data.status === 'pending')
  
  const [selected, setSelected] = useState<{ [key: string]: { selected: boolean; selectedColor: string } }>({});

  useEffect(() => {
    let appointments: { [key: string]: any } = {};
    pendings.forEach(value => {
      let key = convertDate(value.date)
      appointments[key] = {
        selected: true,
        selectedColor: theme.colors["purple-700"]
      };
    });
    setSelected(appointments);

    }, [appointment])

 

  return (
    <View
      style={{
        gap: 16,
        width: "100%",
      }}>
      <SectionHeader
        title="Appointments"
        onPress={() => navigation.navigate("Appointments")}
      />

      <Calendar
        style={{
          borderRadius: theme.rounded.medium,
          boxShadow: "0px 25px 25px 0px #00000026",
        }}
        theme={calendarTheme}
        renderArrow={(direction: string) => (
          <Feather
            name={direction === "left" ? "chevron-left" : "chevron-right"}
            size={24}
            color={theme.colors["neutral-700"]}
          />
        )}
        current={"2025-02-01"}
        markedDates={selected}
        enableSwipeMonths
        onDayPress={(day: any) => {

          // remember to set nav
          console.log("selected day", day);
        }}
      />

      {/* <View
        style={{
          flexDirection: "row",
          gap: 8,
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Entypo
            name="dot-single"
            size={36}
            color={theme.colors["purple-700"]}
          />
          <Text>Appointments</Text>
        </View> */}

        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Entypo
            name="dot-single"
            size={36}
            color={theme.colors["yellow-600"]}
          />
          <Text>Surgeries</Text>
        </View> 
    </View> */}
    </View>
  );
};

export default AppointmentCalendar;
