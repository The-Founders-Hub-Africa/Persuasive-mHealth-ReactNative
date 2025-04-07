import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { AppointmentProps } from "@/types";
import globalStyles from "@/styles/global";
import formStyles from "@/styles/formStyles";
import typography from "@/styles/typography";
import theme from "@/styles/theme";
import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useAppointmentsMutation } from "@/integrations/features/apis/apiSlice";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { addAlert } from "@/integrations/features/alert/alertSlice";
import { addSingleAppointment } from "@/integrations/features/appointment/appointmentsSlice";
import { convertDate } from "@/integrations/axios_store";

const AppointmentCard = ({
  appointment,
  appointmentPage,
}: {
  appointment: AppointmentProps;
  appointmentPage: boolean;
}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [menuVisible, setMenuVisible] = useState(false);
  const isPassed = new Date(convertDate(appointment.date)) <= new Date();
  const isCompletedOrCancelled =
    appointment.status === "completed" || appointment.status === "cancelled";
  const isPendingAndPassed = appointment.status === "pending" && isPassed;

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  // const appointment = useAppSelector(state => state.appointments.data);

  const [appointmentApi, { isLoading }] = useAppointmentsMutation();

  const handleCancel = (id: number) => {
    let data = {
      data: { action: "set_status", data: { id: id, status: "cancelled" } },
      token: user.usertoken,
    };
    appointmentApi(data).then(data => {
      if (data.error) {
        dispatch(addAlert({ ...data.error, page: "appointment page" }));
      }

      if (data.data) {
        dispatch(addSingleAppointment(data.data));
      }
    });
  };

  const handleComplete = (id: number) => {
    let data = {
      data: { action: "set_status", data: { id: id, status: "completed" } },
      token: user.usertoken,
    };
    appointmentApi(data).then(data => {
      if (data.error) {
        dispatch(addAlert({ ...data.error, page: "appointment page" }));
      }

      if (data.data) {
        dispatch(addSingleAppointment(data.data));
      }
    });
  };

  const moveToEdit = () => {
    appointmentPage
      ? navigation.navigate("Edit Appointment", {
          id: appointment.id,
          name: appointment.patient_name,
        })
      : navigation.navigate("Appointments", {
          screen: "Edit Appointment",
          params: { id: appointment.id, name: appointment.patient_name },
        });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        appointmentPage
          ? navigation.navigate("Appointment Details", {
              id: appointment.id,
              name: appointment.patient_name,
            })
          : navigation.navigate("Appointments", {
              screen: "Appointment Details",
              params: { id: appointment.id, name: appointment.patient_name },
            });
      }}
      style={{
        backgroundColor: theme.colors["purple-50"],
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: theme.rounded.medium,
        gap: 16,
        position: "relative",
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
        }}>
        {/* Appointment Patient Image */}
        <Image
          source={appointment.document}
          style={{
            width: 62,
            height: 62,
            borderRadius: theme.rounded.medium,
            backgroundColor: theme.colors["purple-100"],
          }}
        />

        {/* Center: Appointment Details */}
        <View style={{ gap: 8 }}>
          <Text style={typography.textBase_Medium}>
            {appointment.patient_name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              gap: 4,
              marginTop: 4,
            }}>
            <Feather
              name={appointment.mode === "online" ? "wifi" : "wifi-off"}
              size={15}
              color={theme.colors["purple-400"]}
            />
            <Text
              style={[
                typography.textXS_Regular,
                {
                  color: theme.colors["purple-400"],
                  width: "auto",
                },
              ]}>
              {appointment.mode}
            </Text>
          </View>

          <Text style={typography.textXS_Regular}>{appointment.status} </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              gap: 8,
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 4,
                marginTop: 4,
              }}>
              <AntDesign
                name="calendar"
                size={15}
                color={isPendingAndPassed ? "red" : theme.colors["neutral-500"]}
              />
              <Text
                style={[
                  typography.textXS_Regular,
                  {
                    color: isPendingAndPassed
                      ? "red"
                      : theme.colors["neutral-500"],
                    width: "auto",
                  },
                ]}>
                {appointment.date}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 4,
                marginTop: 4,
              }}>
              <AntDesign
                name="clockcircleo"
                size={15}
                color={isPendingAndPassed ? "red" : theme.colors["neutral-500"]}
              />
              <Text
                style={[
                  typography.textXS_Regular,
                  {
                    color: isPendingAndPassed
                      ? "red"
                      : theme.colors["neutral-500"],
                    width: "auto",
                  },
                ]}>
                {appointment.time}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Right */}
      {isCompletedOrCancelled ? (
        <TouchableOpacity
          style={[
            formStyles.submitButton,
            {
              width: "auto",
              position: "absolute",
              right: 10,
              top: 10,
            },
          ]}>
          <Text
            style={[
              formStyles.submitText,
              typography.textSmall_Medium,
              {
                color: theme.colors.white,
              },
            ]}
            onPress={moveToEdit}>
            Reschedule
          </Text>
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity
            style={globalStyles.actionsBtn}
            onPress={() => setMenuVisible(!menuVisible)}>
            <Feather name="more-vertical" size={24} color="#555" />
          </TouchableOpacity>

          {/* Dropdown Menu */}
          {menuVisible && (
            <View style={globalStyles.actionsDropdown}>
              <TouchableOpacity onPress={moveToEdit}>
                <Text style={{ padding: 8 }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleComplete(appointment.id)}>
                <Text style={{ padding: 8 }}>Complete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCancel(appointment.id)}>
                <Text style={{ padding: 8, color: "red" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AppointmentCard;
