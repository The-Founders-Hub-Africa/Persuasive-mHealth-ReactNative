import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import globalStyles from "@/styles/global";
import theme from "@/styles/theme";
import typography from "@/styles/typography";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Feather } from "@expo/vector-icons";
import PatientProfileCard from "@/components/common/PatientProfileCard";
import formStyles from "@/styles/formStyles";
import { get_id } from "@/integrations/axios_store";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
const AppointmentDetailsScreen = () => {

  const navigation = useRouter();
  let id = 0
  let {id:id_} = useLocalSearchParams<{id?:string}>();
  if(id_){
    id = parseInt(id_)
  }

  const [appointment] = useAppSelector(state =>
    state.appointments.data.filter(data => data.id === id)
  );
  const [patient] = useAppSelector(state =>
    state.patients.data.filter(data => data.id === appointment.patient)
  );

  return (
    <ScrollView>
      <View
        style={[
          globalStyles.dashboardContainer,
          {
            gap: 24,
          },
        ]}>
        <PatientProfileCard patient={patient} />
        <View style={styles.stats}>
          <View
            style={{
              gap: 4,
              flexDirection: "row",
              alignItems: "center",
            }}>
            <Feather
              name={appointment.mode === "online" ? "wifi" : "wifi-off"}
              size={20}
              color={theme.colors["purple-700"]}
            />

            <Text
              style={{
                color: theme.colors["purple-700"],
              }}>
              {appointment.mode}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 8,
            }}>
            <View
              style={{
                gap: 4,
                flexDirection: "row",
                alignItems: "center",
              }}>
              <AntDesign
                name="calendar"
                size={20}
                color={theme.colors["neutral-500"]}
              />

              <Text
                style={{
                  color: theme.colors["neutral-500"],
                }}>
                {appointment.date}
              </Text>
            </View>

            <View
              style={{
                gap: 4,
                flexDirection: "row",
                alignItems: "center",
              }}>
              <AntDesign
                name="clockcircleo"
                size={20}
                color={theme.colors["neutral-500"]}
              />

              <Text
                style={{
                  color: theme.colors["neutral-500"],
                }}>
                {appointment.time}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            gap: 8,
          }}>
          <Text style={typography.textBase_Medium}>Medical condition</Text>
          <Text style={typography.textSmall_Regular}>
            {appointment.condition}
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            gap: 8,
          }}>
          <Text style={typography.textBase_Medium}>Symptoms</Text>
          <Text style={typography.textSmall_Regular}>
            {appointment.symptoms}
          </Text>
        </View>

        {/* Notes */}
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            justifyContent: "space-between",
          }}>
          <View style={{ width: "100%" }}>
            <Text style={[typography.textBase_Regular]}>Notes</Text>
            <TextInput
              style={[typography.textBase_Regular, styles.textarea]}
              multiline
              readOnly>
              {appointment.notes}
            </TextInput>
          </View>
        </View>
        
        <TouchableOpacity
          style={formStyles.submitButton}
          onPress={() =>
            navigation.push({pathname:"/appointments/editAppointment", params:{
              id: appointment.id,
              name: appointment.patient_name,
            }})
          }>
          <Text style={formStyles.submitText}>Edit appointment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AppointmentDetailsScreen;

// stylesheet
const styles = StyleSheet.create({
  stats: {
    backgroundColor: theme.colors["purple-50"],
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: theme.rounded.medium,
    gap: 24,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: theme.rounded.medium,
    backgroundColor: theme.colors["purple-100"],
  },
  bottomItem: {
    flexDirection: "row", 
    alignItems: "flex-start",
    gap: 16,
  },
  bottomIcon: {
    width: 46,
    height: 46,
    borderRadius: theme.rounded.medium,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    backgroundColor: theme.colors["purple-50"],
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: theme.rounded.medium,
    marginTop: 8,
  },
  textarea: {
    backgroundColor: theme.colors["purple-50"],
    paddingVertical: 22,
    paddingHorizontal: 24,
    borderRadius: theme.rounded.medium,
    marginTop: 8,
    width: "100%",
    flexWrap: "wrap",
    textAlignVertical: "top",
    lineHeight: 22,
    height: 150,
  },
});
