import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import globalStyles from "@/styles/global";
import PatientActivity from "@/components/Analytics/PatientActivity";
import Demographics from "@/components/Analytics/Demographics";
// import AppointmentAnalysis from "@/src/components/analytics/AppointmentAnalysis";
import AppointmentAnalysis from "@/components/Analytics/AppointmentAnalysis";
// import Alert_System from "@/src/integrations/features/alert/Alert";

const AnalyticsScreen = () => {
  return (
    <ScrollView>
         {/* <Alert_System /> */}
      <View style={style.container}>
        <Demographics />
        <PatientActivity hideViewAll />
        <AppointmentAnalysis />
      </View>
    </ScrollView>
  );
};

export default AnalyticsScreen;

const style = StyleSheet.create({
  container: {
    ...globalStyles.dashboardContainer,
    marginBottom: 16,
    gap: 24,
  },
});
