import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import globalStyles from "@/styles/global";
import formStyles from "@/styles/formStyles";
import { Controller, useForm } from "react-hook-form";
import { Feather, Ionicons } from "@expo/vector-icons";
import theme from "@/styles/theme";
import modalStyles from "@/styles/modalStyles";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import ModalPopup from "@/components/common/ModalPopup";
import {
  Appointments,
  convertDate
} from "@/integrations/axios_store";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import * as ImagePicker from "expo-image-picker";
import { addSingleAppointment } from "@/integrations/features/appointment/appointmentsSlice";
import { addAlert } from "@/integrations/features/alert/alertSlice";
import { useLocalSearchParams, useRouter } from "expo-router";

type FormData = {
  name: string;
  condition: string;
  symptoms: string;
  notes: string;
  // document: string | null;
  date: string;
  time: string;
  mode: string;
};

const EditAppointmentScreen = () => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date:string) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const navigation = useRouter();
  let id = 0
  let {id:id_} = useLocalSearchParams<{id?:string}>();
  if(id_){
    id = parseInt(id_)
    }
  

  const [showModal, setShowModal] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [fileDetails, setfileDetails] = useState({ type: "", filename: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [appointment] = useAppSelector(state =>
    state.appointments.data.filter(data => data.id === id)
  );
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const formatTime = ({
    hours,
    minutes,
  }: {
    hours: number;
    minutes: number;
  }) => {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: appointment.patient_name,
      condition: appointment.condition,
      symptoms: appointment.symptoms,
      notes: appointment.notes,
      // document: appointment.document,
      date: appointment.date ? convertDate(appointment.date) : "",
      time: appointment.time,
      mode: appointment.mode,
    },
  });

  const handleContinue = async (data: FormData) => {
    setIsSubmitting(true)
    let newData = {
      ...data,
      patient: appointment.patient,
      medical_practitioner: user.id,
      status:'pending',
      id: appointment.id,
    };
    let data_ = {
      token: user.usertoken,
      data: {
        formdata: newData,
        img: fileDetails,
      },
    };
    let res = await Appointments(data_);
    if (res.success) {
      // reset form data here

      //
      setIsSubmitting(false)
      dispatch(addSingleAppointment(res.data.event));
      setShowModal(true);
      navigation.navigate("../appointments");
    } else {
       setIsSubmitting(false)
      let err = {
        status: res.status,
        data: res.data,
        page: "edit_appointment_page",
      };
      dispatch(addAlert(err));
    }
  };

  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        {/* Patient Name */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Patient Name</Text>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Patient name is required" }}
            render={({ field: { onChange, value } }) => (
              <View style={formStyles.inputCntr}>
                <Feather
                  name="user"
                  size={20}
                  color={theme.colors["neutral-700"]}
                />
                <TextInput
                  style={formStyles.inputText}
                  placeholder="John Doe"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
          />
          {errors.name && (
            <Text style={globalStyles.errorText}>{errors.name.message}</Text>
          )}
        </View>

        {/* Medical Condition */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Medical Condition</Text>
          <Controller
            control={control}
            name="condition"
            rules={{ required: "Medical condition is required" }}
            render={({ field: { onChange, value } }) => (
              <View style={formStyles.inputCntr}>
                <TextInput
                  style={formStyles.inputText}
                  placeholder="Diabetes, Hypertension, etc."
                  placeholderTextColor={theme.colors["disabled-text"]}
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
          />
          {errors.condition && (
            <Text style={globalStyles.errorText}>
              {errors.condition.message}
            </Text>
          )}
        </View>

        {/* Symptoms */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Symptoms</Text>
          <Controller
            control={control}
            name="symptoms"
            rules={{ required: "Symptoms are required" }}
            render={({ field: { onChange, value } }) => (
              <View style={formStyles.inputCntr}>
                <TextInput
                  style={formStyles.inputText}
                  placeholder="Fever, Cough, Headache"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
          />
          {errors.symptoms && (
            <Text style={globalStyles.errorText}>
              {errors.symptoms.message}
            </Text>
          )}
        </View>

        {/* Notes */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Notes</Text>
          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, value } }) => (
              <View style={formStyles.inputCntr}>
                <TextInput
                  style={[
                    formStyles.inputText,
                    { height: 150, textAlignVertical: "top" },
                  ]}
                  placeholder="Fever, Cough, Headache"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={7}
                />
              </View>
            )}
          />
          {errors.notes && (
            <Text style={globalStyles.errorText}>{errors.notes.message}</Text>
          )}
        </View>

        {/* Date Picker */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Select Date</Text>
          <TouchableOpacity onPress={() => setCalendarVisible(true)}>
            <View style={formStyles.inputDateCntr}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={theme.colors["neutral-700"]}
              />
              <Controller
                control={control}
                name="date"
                rules={{ required: "Date is required" }}
                render={({ field: { value } }) => (
                  <Text style={formStyles.inputText}>
                    {value || "Select Date"}
                  </Text>
                )}
              />
            </View>
          </TouchableOpacity>

          {errors.date && (
            <Text style={globalStyles.errorText}>{errors.date.message}</Text>
          )}
        </View>

         {/* Date Picker Modal */}
          {calendarVisible && (
             <View>
          <DateTimePicker
            value={new Date(getValues("date"))}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setCalendarVisible(false);
              if (date) {
                setValue("date", date.toISOString().split("T")[0]); // Format date to YYYY-MM-DD 
              }
            }}
          />
        </View>
          )}

        {/* Time Picker */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Select Time</Text>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <View style={formStyles.inputDateCntr}>
              <Ionicons
                name="time-outline"
                size={20}
                color={theme.colors["neutral-700"]}
              />
              <Controller
                control={control}
                name="time"
                rules={{ required: "Time is required" }}
                render={({ field: { value } }) => (
                  <Text style={formStyles.inputText}>
                    {value || "Select Time"}
                  </Text>
                )}
              />
            </View>
          </TouchableOpacity>

          {errors.time && (
            <Text style={globalStyles.errorText}>{errors.time.message}</Text>
          )}
        </View>

          {/* Time Picker Modal */}
          {showPicker && (
             <View>
          <DateTimePicker
            value={new Date(getValues("time"))}
            mode="time"
            display="default"
            onChange={(event, time) => {
              setShowPicker(false);
              if (time) {
                // Format time to "HH:mm"
                const formattedTime = `${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`;
                setValue("time", formattedTime);
              }
            }}
          />
        </View>
          )}
        

        {/* Mode Selection */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Select Mode</Text>
          <Controller
            control={control}
            name="mode"
            rules={{ required: "Mode is required" }}
            render={({ field: { onChange, value } }) => (
              <View style={formStyles.inputDropdownCntr}>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={formStyles.inputText}>
                  <Picker.Item label="Select mode" value="" />
                  <Picker.Item label="Offline" value="offline" />
                  <Picker.Item label="Online" value="online" />
                </Picker>
              </View>
            )}
          />
          {errors.mode && (
            <Text style={globalStyles.errorText}>{errors.mode.message}</Text>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit(handleContinue)}
          disabled={isSubmitting}
          style={[
            formStyles.submitButton,
            {
              backgroundColor: isSubmitting
                ? theme.colors["disabled-bg"]
                : theme.colors["purple-700"],
            },
          ]}>
          <Text
            style={{
              color: isSubmitting
                ? theme.colors["disabled-text"]
                : theme.colors.white,
            }}>
            Update Appointment
          </Text>
        </TouchableOpacity>

        {/* Success Modal */}
        <ModalPopup
          title="Success!"
          message="Your apointment was successfully updated."
          showModal={showModal}
          setShowModal={setShowModal}
          onPress={() => {
            setShowModal(false);
          }}
        />
      </View>
    </ScrollView>
  );
};

export default EditAppointmentScreen;

const styles = StyleSheet.create({
  profileImageCntr: {
    marginBottom: 24,
    height: 200,
    borderRadius: 8,
    backgroundColor: theme.colors["purple-50"],
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
});
