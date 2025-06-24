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
} from "react-native";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
// import { launchImageLibrary } from "react-native-image-picker";
import modalStyles from "@/styles/modalStyles";
import theme, { calendarTheme } from "@/styles/theme";
import globalStyles from "@/styles/global";
import typography from "@/styles/typography";
import formStyles from "@/styles/formStyles";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { convertDate, convertDate2, UserProfile } from "@/integrations/axios_store";
import { loginUser } from "@/integrations/features/user/usersSlice";
import { addAlert } from "@/integrations/features/alert/alertSlice";
import { baseUrl } from "@/integrations/features/apis/apiSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";


type FormData = {
  full_name: string;
  email: string;
  phone_number: string;
  biography: string;
  specialization: string;
  work_experience: number;
  gender: string;
  date_of_birth: string;
  image: string | null;
};

export default function EditProfileScreen() {

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [imageDetails, setimageDetails] = useState({ type: "", filename: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  // let id = 0
  // let {id:id_} = useLocalSearchParams<{id?:string}>();
  // if(id_){
  //   id = parseInt(id_)
  //   }
  


  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      biography: user.biography,
      specialization: user.specialization,
      work_experience: user.work_experience,
      gender: user.gender,
      date_of_birth: user.date_of_birth
        ? convertDate(user.date_of_birth)
        : new Date().toISOString().split("T")[0], // Default to today
      image: user.image ? `${baseUrl}${user.image}` : null,
      // image: null,
    },
  });

  // Request permission for image picker
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access camera roll is required!");
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const handleContinue = async (data: FormData) => {
    setIsSubmitting(true)
    let data_ = {
      token: user.usertoken,
      data: {
        formdata: {
                    ...data,
                    date_of_birth: convertDate2(data.date_of_birth),
                  },
        img: imageDetails,
      },
    };
    // console.log(data_)
    let res = await UserProfile(data_);
    if (res.success) {
      dispatch(
        loginUser({
          ...res.data.user,
          usertoken: res.data.token,
          logedin: true,
          save: true,
        })
      );
       setIsSubmitting(false)
      navigation.navigate("../home");
    } else {
      setIsSubmitting(false)
      let err = {
        status: res.status,
        data: res.data,
        page: "editprofile",
      };
       
      dispatch(addAlert(err));
    }
  };

 

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let returndata = result.assets[0];
      if (returndata.mimeType && returndata.fileName) {
        const uri = returndata.uri || null;
        setimageDetails({
          type: returndata.mimeType,
          filename: returndata.fileName,
        });
        setValue("image", uri);
      }
    } else {
      console.log("Image Picker Error: ---");
    }
  };

  return (
    <ScrollView>
      <View
        style={[
          globalStyles.dashboardContainer,
          { gap: 24, flex: 1, width: "100%" },
        ]}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}>
          {/* Upload Avatar */}
          <TouchableOpacity
            style={[
              formStyles.profileImageCntr,
              {
                marginBottom: 8,
              },
            ]}
            onPress={handleImageUpload}>
            <Controller
              control={control}
              name="image"
              render={({ field: { value } }) =>
                value ? (
                  <Image
                    source={{ uri: value }}
                    style={formStyles.profileImage}
                  />
                ) : (
                  <FontAwesome name="user" size={40} color="#a9a9a9" />
                )
              }
            />
          </TouchableOpacity>

          <View>
            <Text>Edit Image</Text>
          </View>
        </View>

        {/* Personal Information */}
        <View style={{ width: "100%" }}>
          <Text
            style={[
              typography.textXL_Medium,
              {
                marginBottom: 8,
              },
            ]}>
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

          {/* Email */}
          <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field: { onChange, value } }) => (
                <View
                  style={[formStyles.inputCntr, formStyles.inputCntrDisabled]}>
                  <SimpleLineIcons
                    name="envelope"
                    size={20}
                    color={theme.colors["neutral-700"]}
                  />
                  <TextInput
                    style={[formStyles.inputText, formStyles.inputTextDisabled]}
                    placeholder="you@email.com"
                    placeholderTextColor={theme.colors["disabled-text"]}
                    keyboardType="email-address"
                    value={value}
                    onChangeText={onChange}
                    readOnly
                  />
                </View>
              )}
            />
            {errors.email && (
              <Text style={globalStyles.errorText}>
                {errors.email.message?.toString()}
              </Text>
            )}
          </View>

          {/* Phone Number */}
          <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>Phone Number</Text>
            <Controller
              control={control}
              name="phone_number"
              rules={{ required: "Phone number is required" }}
              render={({ field: { onChange, value } }) => (
                <View
                  style={[formStyles.inputCntr, formStyles.inputCntrDisabled]}>
                  <Feather
                    name="phone"
                    size={20}
                    color={theme.colors["neutral-700"]}
                  />
                  <TextInput
                    style={[formStyles.inputText, formStyles.inputTextDisabled]}
                    placeholder="+264812345678"
                    placeholderTextColor={theme.colors["disabled-text"]}
                    keyboardType="phone-pad"
                    value={value}
                    onChangeText={onChange}
                    readOnly
                  />
                </View>
              )}
            />
            {errors.phone_number && (
              <Text style={globalStyles.errorText}>
                {errors.phone_number.message?.toString()}
              </Text>
            )}
          </View>

          {/* Biography */}
          <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>Biography</Text>
            <Controller
              control={control}
              name="biography"
              rules={{ required: "Biography is required" }}
              render={({ field: { onChange, value } }) => (
                <View style={formStyles.inputCntr}>
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
                    numberOfLines={7}
                  />
                </View>
              )}
            />
            {errors.biography && (
              <Text style={globalStyles.errorText}>
                {errors.biography.message}
              </Text>
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
            ]}>
            Other Information
          </Text>

          {/* Specialization */}
          <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>Area of Specialization</Text>
            <Controller
              control={control}
              name="specialization"
              rules={{ required: "Specialization is required" }}
              render={({ field: { onChange, value } }) => (
                <View style={formStyles.inputDropdownCntr}>
                  <Picker selectedValue={value} onValueChange={onChange}>
                    <Picker.Item label="Cardiology" value="Cardiology" />
                    <Picker.Item label="Neurology" value="Neurology" />
                    <Picker.Item label="Dermatology" value="Dermatology" />
                  </Picker>
                </View>
              )}
            />
            {errors.specialization && (
              <Text style={globalStyles.errorText}>
                {errors.specialization.message?.toString()}
              </Text>
            )}
          </View>

          {/* work_experience */}
          <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>Years of Experience</Text>
            <Controller
              control={control}
              name="work_experience"
              rules={{ required: "Experience is required" }}
              render={({ field: { onChange, value } }) => (
                <View style={formStyles.inputDropdownCntr}>
                  <Picker selectedValue={value} onValueChange={onChange}>
                    <Picker.Item value="1" label="1 years" />
                    <Picker.Item value="2" label="2 years" />
                    <Picker.Item value="3" label="3 years" />
                  </Picker>
                </View>
              )}
            />
            {errors.work_experience && (
              <Text style={globalStyles.errorText}>
                {errors.work_experience.message?.toString()}
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
                    style={[formStyles.inputCntr, formStyles.genderOptionMale]}>
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
                    ]}>
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
                    <Text style={formStyles.inputText}>{value}</Text>
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
          ]}>
          <Text
            style={{
              color: isSubmitting
                ? theme.colors["disabled-text"]
                : theme.colors.white,
            }}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
