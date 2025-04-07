import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import typography from "@/styles/typography";
import theme from "@/styles/theme";
import { PieChart } from "react-native-gifted-charts";
import { useAppSelector } from "@/integrations/hooks";

const AppointmentAnalysis = () => {
  
  const appointments = useAppSelector(state => state.appointments.data);
  const today = new Date().toISOString().split("T")[0];
  
  const getTodayAppointments = () => {
    const totalAppointments = appointments.filter(
      (appointment) => appointment.date === today
    ).length;

    const completedAppointments = appointments.filter(
      (appointment) => appointment.date === today && appointment.status === "completed"
    ).length;

    return { totalAppointments, completedAppointments };
  };

  const [appointmentCount, setAppointmentCount] = useState({totalAppointments: 0, completedAppointments: 0});

  const [pieData,setPieData] = useState([
    {
      value: 85,
      color: theme.colors["purple-700"],
      gradientCenterColor: theme.colors["purple-700"],
      focused: true,
    },
    {
      value: 15,
      color: theme.colors["neutral-300"],
      gradientCenterColor: theme.colors["neutral-300"],
    },
  ]);

  useEffect(() => {
    const { totalAppointments, completedAppointments } = getTodayAppointments();
    setAppointmentCount({ totalAppointments, completedAppointments });
    let completedPercentage = 0;
    let pendingPercentage = 100;

    if (totalAppointments > 0) {
      completedPercentage = (completedAppointments / totalAppointments) * 100;
      completedPercentage = Math.round(completedPercentage);
      pendingPercentage = 100 - completedPercentage; 
    }
    

    setPieData([
      {
        ...pieData[0],
        value: completedPercentage,
      },
      {
        ...pieData[1],
        value: pendingPercentage,
      },
    ]);
  
  }, [appointments]);

  return (
    <View>
      <Text style={style.title}>Appointments Analysis</Text>

      <View style={style.container}>
        <View style={style.demographics}>
          <Text
            style={[
              typography.textBase_Regular,
              {
                width: "auto",
                paddingLeft: 8,
              },
            ]}>
            User Activity
          </Text>
          <Text
            style={[
              typography.textBase_Regular,
              {
                width: "auto",
              },
            ]}>
            {new Date(today).toLocaleDateString("en-GB")}
          </Text>
        </View>

        <View style={{ marginHorizontal: "auto", marginVertical: 16 }}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={theme.colors["purple-50"]}
            centerLabelComponent={() => {
              return (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 22,
                      color: theme.colors["neutral-700"],
                      fontWeight: "bold",
                    }}>
                    {appointmentCount.completedAppointments }
                  </Text>
                  <Text style={{ fontSize: 14, color: theme.colors["neutral-700"] }}>
                    Completed
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <View style={style.demographics}>
          <Text
            style={[
              style.left,
              {
                borderLeftColor: theme.colors["purple-700"],
              },
            ]}>
            Completed appointments
          </Text>
          <View
            style={[
              style.right,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 8,
              },
            ]}>
            <Text>{appointmentCount.completedAppointments }</Text>
            <Text
              style={{
                color: theme.colors["purple-700"],
              }}>
              {pieData[0].value}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AppointmentAnalysis;

const style = StyleSheet.create({
  title: {
    marginBottom: 16,
    ...typography.textLG_Medium,
  },
  subTitle: {
    ...typography.textBase_Regular,
  },
  container: {
    backgroundColor: theme.colors["purple-50"],
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderRadius: theme.rounded.medium,
    gap: 16,
    width: "100%",
  },
  demographics: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    width: "100%",
    paddingRight: 8,
  },
  left: {
    ...typography.textSmall_Regular,
    width: "auto",
    borderLeftWidth: 8,
    paddingLeft: 8,
  },
  right: {
    ...typography.textSmall_Regular,
    width: "auto",
  },
});
