import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  StyleSheet,
  TouchableWithoutFeedbackBase,
} from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import theme from "@/styles/theme";
import globalStyles from "@/styles/global";
import typography from "@/styles/typography";
import formStyles from "@/styles/formStyles";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import ModalPopup from "@/components/common/ModalPopup";
import { addAlert } from "@/integrations/features/alert/alertSlice";
import { addSinglePatient } from "@/integrations/features/patient/patientsSlice";
import {
  Patients,
} from "@/integrations/axios_store";
import { addPatientCount } from "@/integrations/features/user/usersSlice";

// import Alert_System from "@/src/integrations/features/alert/Alert";
import { useRouter } from "expo-router";

type FormData = {
  full_name: string;
  whatsapp_number: string;
  address: string;
  about: string;
  date_of_birth: string;
  genotype: string;
  gender: string;
  next_of_kin: string;
  kin_number: string;
  condition: string;
  symptoms: string;
  // document: string;
  identifier: string;
  medical_practitioner: number;
};

export default function NewPatientScreen() {
  // useEffect(() => {
  //   Toast.success("Promised is resolved");
  // }, []);

  const navigation = useRouter();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fileDetails, setfileDetails] = useState({ type: "", filename: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [date, setDate] = useState(new Date());

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      full_name: "",
      whatsapp_number: "",
      address: "",
      about: "",
      date_of_birth: "",
      genotype: "",
      gender: "",
      next_of_kin: "",
      kin_number: "",
      condition: "",
      symptoms: "",
      // document: "",
      identifier: "",
      medical_practitioner: user.id,
    },
  });

  // Request permission for image picker
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access camera roll is required!"
      );
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const handleContinue = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      let response = await Patients({
        token: user.usertoken,
        data: {
          formdata: data,
          img: fileDetails,
        },
      });

      if (response.success) {
        dispatch(addSinglePatient(response.data.patient));
        dispatch(addPatientCount({ gender: response.data.patient.gender }));
        setShowModal(true);
        navigation.navigate("../patients");
      } else {
        dispatch(addAlert({ status: response.status, data: response.data }));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert("Submission Failed", "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleContinue = async (data: FormData) => {
  //   console.log(data.date_of_birth);
  //   let data_ = {
  //     token: user.usertoken,
  //     data: {
  //       formdata: { ...data, date_of_birth: convertDate2(data.date_of_birth) },

  //       img: fileDetails,
  //     },
  //   };

  //   console.log(data_);
  //   setIsSubmitting(true);
  //   let res = await Patients(data_);
  //   if (res.success) {
  //     // reset form data here

  //     //

  //     setIsSubmitting(false);
  //     dispatch(addSinglePatient(res.data.patient));
  //     dispatch(addPatientCount({ gender: res.data.patient.gender }));
  //     setShowModal(true);
  //     navigation.navigate("Patients");
  //   } else {
  //     setIsSubmitting(false);
  //     let err = {
  //       status: res.status,
  //       data: res.data,
  //       page: "new_patient_page",
  //     };
  //     dispatch(addAlert(err));
  //   }
  // };

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
  //       if (uri) {
  //         setValue("document", uri);
  //       }
  //     }
  //   } else {
  //     console.log("Image Picker Error: ---");
  //   }
  // };

  return (
    <ScrollView>
      <View
        style={[
          globalStyles.dashboardContainer,
          { gap: 24, flex: 1, width: "100%", position: "relative" }, // position: "relative" is used to position the alert and toast at the top of the screen
        ]}
      >
        {/* <Alert_System /> */}
        {/* Personal Information */}
        <View style={{ width: "100%" }}>
          <Text
            style={[
              typography.textXL_Medium,
              {
                marginBottom: 8,
              },
            ]}
          >
            Personal Information
          </Text>

          {/* Full Name */}
          <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>Full Name</Text>
            <Controller
              control={control}
              name="full_name"
              rules={{ required: "Full Name is required" }}
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
            {errors.full_name && (
              <Text style={globalStyles.errorText}>
                {errors.full_name.message}
              </Text>
            )}
          </View>

          {/* Phone Number */}
          <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>Phone Number</Text>
            <Controller
              control={control}
              name="whatsapp_number"
              rules={{ required: "Phone number is required" }}
              render={({ field: { onChange, value } }) => (
                <View style={formStyles.inputCntr}>
                  <Feather
                    name="phone"
                    size={20}
                    color={theme.colors["neutral-700"]}
                  />
                  <TextInput
                    style={formStyles.inputText}
                    placeholder="+264812345678"
                    placeholderTextColor={theme.colors["disabled-text"]}
                    keyboardType="phone-pad"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
            {errors.whatsapp_number && (
              <Text style={globalStyles.errorText}>
                {errors.whatsapp_number.message?.toString()}
              </Text>
            )}
          </View>

          {/* Address */}
          <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>Address</Text>
            <Controller
              control={control}
              name="address"
              rules={{ required: "Address is required" }}
              render={({ field: { onChange, value } }) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: 4,
                    borderWidth: 1,
                    borderColor: theme.colors["purple-400"],
                    borderRadius: 8,
                    paddingVertical: 2,
                    paddingHorizontal: 12,
                    width: "100%",
                  }}
                >
                  <EvilIcons
                    name="location"
                    size={24}
                    color={theme.colors["neutral-700"]}
                    style={{
                      marginTop: 12,
                    }}
                  />
                  <TextInput
                    style={[
                      formStyles.inputText,
                      { height: 70, textAlignVertical: "top" },
                    ]}
                    placeholder="Tell us about yourself..."
                    placeholderTextColor={theme.colors["disabled-text"]}
                    value={value}
                    onChangeText={onChange}
                    multiline={true}
                    numberOfLines={7}
                  />
                </View>
              )}
            />
            {errors.address && (
              <Text style={globalStyles.errorText}>
                {errors.address.message}
              </Text>
            )}
          </View>

          {/* About */}
          <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>About</Text>
            <Controller
              control={control}
              name="about"
              rules={{ required: "About is required" }}
              render={({ field: { onChange, value } }) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: 4,
                    borderWidth: 1,
                    borderColor: theme.colors["purple-400"],
                    borderRadius: 8,
                    paddingVertical: 2,
                    paddingHorizontal: 12,
                    width: "100%",
                  }}
                >
                  <EvilIcons
                    name="location"
                    size={24}
                    color={theme.colors["neutral-700"]}
                    style={{
                      marginTop: 12,
                    }}
                  />
                  <TextInput
                    style={[
                      formStyles.inputText,
                      { height: 150, textAlignVertical: "top" },
                    ]}
                    placeholder="Tell us about yourself..."
                    placeholderTextColor={theme.colors["disabled-text"]}
                    value={value}
                    onChangeText={onChange}
                    multiline={true}
                    numberOfLines={2}
                  />
                </View>
              )}
            />
            {errors.about && (
              <Text style={globalStyles.errorText}>{errors.about.message}</Text>
            )}
          </View>
        </View>
        {/* Other Information */}
        <View style={{ width: "100%" }}>
          <Text
            style={[
              typography.textXL_Medium,
              {
                marginBottom: 8,
              },
            ]}
          >
            Other Information
          </Text>

          {/* Date of Birth */}
          <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>Date of Birth</Text>
            <TouchableOpacity onPress={() => setCalendarVisible(true)}>
              <View style={formStyles.inputDateCntr}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={theme.colors["neutral-700"]}
                />
                <Controller
                  control={control}
                  name="date_of_birth"
                  render={({ field: { value } }) => (
                    <Text style={formStyles.inputText}>
                      {value || "Select Date"}
                    </Text>
                  )}
                />
              </View>
            </TouchableOpacity>
          </View>

        {/* Date Picker Modal */}
          {calendarVisible && (
             <View>
          <DateTimePicker
            value={new Date(getValues("date_of_birth"))}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setCalendarVisible(false);
              if (date) {
                setValue("date_of_birth", date.toISOString().split("T")[0]); // Format date to YYYY-MM-DD 
              }
            }}
          />
        </View>
          )}

          {/* Genotype */}
          <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>Genotype</Text>
            <Controller
              control={control}
              name="genotype"
              rules={{ required: "Genotype is required" }}
              render={({ field: { onChange, value } }) => (
                <View style={formStyles.inputDropdownCntr}>
                  <Picker selectedValue={value} onValueChange={onChange}>
                    <Picker.Item label="Select Genotype" value="" />
                    <Picker.Item label="AA" value="AA" />
                    <Picker.Item label="AS" value="AS" />
                    <Picker.Item label="AC" value="AC" />
                    <Picker.Item label="SC" value="SC" />
                    <Picker.Item label="SS" value="SS" />
                    <Picker.Item label="SD" value="SD" />
                    <Picker.Item label="SE" value="SE" />
                  </Picker>
                </View>
              )}
            />
            {errors.genotype && (
              <Text style={globalStyles.errorText}>
                {errors.genotype.message?.toString()}
              </Text>
            )}
          </View>

          {/* Gender */}
          <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>Gender</Text>
            <Controller
              control={control}
              name="gender"
              rules={{ required: "Gender is required" }}
              render={({ field: { onChange, value } }) => (
                <View style={formStyles.genderCntr}>
                  <TouchableOpacity
                    onPress={() => onChange("male")}
                    style={[formStyles.inputCntr, formStyles.genderOptionMale]}
                  >
                    <MaterialIcons
                      name={
                        value === "male"
                          ? "check-box"
                          : "check-box-outline-blank"
                      }
                      size={20}
                      color={theme.colors["purple-700"]}
                    />
                    <Text style={formStyles.genderText}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onChange("female")}
                    style={[
                      formStyles.inputCntr,
                      formStyles.genderOptionFemale,
                    ]}
                  >
                    <MaterialIcons
                      name={
                        value === "female"
                          ? "check-box"
                          : "check-box-outline-blank"
                      }
                      size={20}
                      color={theme.colors["purple-700"]}
                    />
                    <Text style={formStyles.genderText}>Female</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.gender && (
              <Text style={globalStyles.errorText}>
                {errors.gender.message?.toString()}
              </Text>
            )}
          </View>

          {/* Next of kin */}
          <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>Next of kin</Text>
            <Controller
              control={control}
              name="next_of_kin"
              rules={{ required: "Next of kin is required" }}
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
            {errors.next_of_kin && (
              <Text style={globalStyles.errorText}>
                {errors.next_of_kin.message}
              </Text>
            )}
          </View>

          {/* Kin Number */}
          <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>Kin Number</Text>
            <Controller
              control={control}
              name="kin_number"
              rules={{ required: "Kin number is required" }}
              render={({ field: { onChange, value } }) => (
                <View style={formStyles.inputCntr}>
                  <TextInput
                    style={formStyles.inputText}
                    placeholder="+264812345678"
                    placeholderTextColor={theme.colors["disabled-text"]}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
            {errors.kin_number && (
              <Text style={globalStyles.errorText}>
                {errors.kin_number.message}
              </Text>
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

          {/* Medical document */}
          {/* <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>Medical document</Text>
            <TouchableOpacity
              style={styles.profileImageCntr}
              onPress={handleImageUpload}>
              <Controller
                control={control}
                name="document"
                render={({ field: { value } }) =>
                  value ? (
                    <Image
                      source={{ uri: value }}
                      style={styles.profileImage}
                    />
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
        </View>
        {/* Continue Button */}
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
          ]}
        >
          <Text
            style={{
              color: isSubmitting
                ? theme.colors["disabled-text"]
                : theme.colors.white,
            }}
          >
            Create Patient
          </Text>
        </TouchableOpacity>
        {/* Success Modal */}
        <ModalPopup
          title="Success!"
          message="Patient created successfully"
          showModal={showModal}
          setShowModal={setShowModal}
          onPress={() => {
            setShowModal(false);
          }}
        />
      </View>
    </ScrollView>
  );
}

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
