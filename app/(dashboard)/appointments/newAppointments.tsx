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
import React, { useEffect, useState } from "react";
import globalStyles from "@/styles/global";
import formStyles from "@/styles/formStyles";
import { Controller, useForm } from "react-hook-form";
import { Feather, Ionicons } from "@expo/vector-icons";
import theme from "@/styles/theme";
import modalStyles from "@/styles/modalStyles";
import { Picker } from "@react-native-picker/picker";
// import { launchImageLibrary } from "react-native-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import typography from "@/styles/typography";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ModalPopup from "@/components/common/ModalPopup";
// import Alert_System from "@/src/integrations/features/alert/Alert";
import { usePatientMutation } from "@/integrations/features/apis/apiSlice";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { addAlert } from "@/integrations/features/alert/alertSlice";
import { addPatients } from "@/integrations/features/patient/patientsSlice";
import { Appointments, convertDate, convertDate2 } from "@/integrations/axios_store";
import * as ImagePicker from "expo-image-picker";
import { addSingleAppointment } from "@/integrations/features/appointment/appointmentsSlice";
import { useRouter } from "expo-router";

type FormData = {
  patient: number;
  condition: string;
  symptoms: string;
  notes: string;
  // document: string | null;
  date: string;
  time: string;
  mode: string;
  medical_practitioner: number;
};

const NewAppointmentsScreen = () => {
  const [showModal, setShowModal] = useState(false);
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

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [fileDetails, setfileDetails] = useState({ type: "", filename: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const patients = useAppSelector(state => state.patients.data);
  const [patientsApi, { isLoading }] = usePatientMutation();

  useEffect(() => {
    let data = {
      data: { action: "get_all", data: {} },
      token: user.usertoken,
    };
    if (user.logedin){
    patientsApi(data).then(data => {
      if (data.error) {
        dispatch(addAlert({ ...data.error, page: "new appointment page" }));
      }

      if (data.data) {
        dispatch(addPatients({ data: data.data, save: true }));
      }
    });
  }
  }, [user]);

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
      patient: 0,
      condition: "",
      symptoms: "",
      notes: "",
      // document: null,
      date: "",
      time: "",
      mode: "",
      medical_practitioner: user.id,
    },
  });

  const handleContinue = async (data: FormData) => {
    setIsSubmitting(true)
    let data_ = {
      token: user.usertoken,
      data: {
        formdata: {
                    ...data,
                    date: convertDate2(data.date),
                  },
        img: fileDetails,
      },
    };
    // console.log(data_)
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
        page: "newappointment_page",
      };
      dispatch(addAlert(err));
      // console.log('Error occurred')
    }
  };

  // const handleImageUpload = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ["images", "videos"],
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     let returndata = result.assets[0];
  //     if (returndata.mimeType && returndata.fileName) {
  //       const uri = returndata.uri || null;
  //       setfileDetails({
  //         type: returndata.mimeType,
  //         filename: returndata.fileName,
  //       });
  //       setValue("document", uri);
  //     }
  //   } else {
  //     console.log("Image Picker Error: ---");
  //   }
  // };

  return (
    <ScrollView>
      {/* <Alert_System /> */}
      <View style={globalStyles.dashboardContainer}>
        {/* Patient Name */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Select Patient</Text>
          <Controller
            control={control}
            name="patient"
            rules={{ required: "Patient name is required" }}
            render={({ field: { onChange, value } }) => (
              <View style={formStyles.inputDropdownCntr}>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={formStyles.inputText}>
                  <Picker.Item label="Select Patient" value="" />
                  {patients.map((patient, index) => (
                    <Picker.Item
                      label={patient.full_name}
                      value={patient.id}
                    />
                  ))}

                  {/* <Picker.Item label="Offline" value="offline" />
                  <Picker.Item label="Online" value="online" /> */}
                </Picker>
              </View>
            )}
          />
          {errors.mode && (
            <Text style={globalStyles.errorText}>{errors.mode.message}</Text>
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

        {/* Upload Document */}
        {/* <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Upload Document</Text>
          <TouchableOpacity
            style={styles.profileImageCntr}
            onPress={handleImageUpload}>
            <Controller
              control={control}
              name="document"
              render={({ field: { value } }) =>
                value ? (
                  <Image source={{ uri: value }} style={styles.profileImage} />
                ) : (
                  <View style={{ gap: 20 }}>
                    <FontAwesome5
                      name="images"
                      size={70}
                      color="black"
                      style={[
                        {
                          color: theme.colors["purple-700"],
                          textAlign: "center",
                        },
                      ]}
                    />

                    <View style={{ gap: 4 }}>
                      <Text style={[typography.textBase_Medium]}>
                        Drop your files here or{" "}
                        <Text
                          style={{
                            color: theme.colors["purple-700"],
                          }}>
                          browse
                        </Text>
                      </Text>
                      <Text
                        style={[
                          typography.textSmall_Medium,
                          {
                            color: theme.colors["neutral-500"],
                            textAlign: "center",
                          },
                        ]}>
                        Maximum size: 50MB
                      </Text>
                    </View>
                  </View>
                )
              }
            />
          </TouchableOpacity>
        </View> */}

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
            Book Appointment
          </Text>
        </TouchableOpacity>
        {/* Success Modal */}
        <ModalPopup
          title="Success!"
          message="Your apointment was successfully created."
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

export default NewAppointmentsScreen;

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
