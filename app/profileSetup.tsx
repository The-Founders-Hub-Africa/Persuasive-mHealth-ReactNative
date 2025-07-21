import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
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
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from "expo-image-picker";
import theme from "@/styles/theme";
import globalStyles from "@/styles/global";
import typography from "@/styles/typography";
import formStyles from "@/styles/formStyles";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { convertDate, UserProfile } from "@/integrations/axios_store";
import { loginUser } from "@/integrations/features/user/usersSlice";
import { addAlert } from "@/integrations/features/alert/alertSlice";
import { useRouter } from "expo-router";

type FormData = {
  full_name: string;
  email: string;
  phone_number: string;
  specialization: string;
  gender: string;
  date_of_birth: string;
  image: string | null;
  biography: string;
  work_experience: number;
};

export default function ProfileSetupScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const navigation = useRouter()
  const [imageDetails, setimageDetails] = useState({ type: "", filename: "" });
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const [loading, setLoading] = useState(true);
  const [otherSpecialization, setOtherSpecialization] = useState("");

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
      biography: "",
      specialization: user.specialization,
      work_experience: 1,
      gender: user.gender,
      date_of_birth: user.date_of_birth
              ? convertDate(user.date_of_birth)
              : new Date().toISOString().split("T")[0],  // Default to today
      // image: user.image?user.image:null,
      image: null,
    },
  });

  useEffect(() => {
    if (!user.logedin && !loading) {
      navigation.navigate('/login');
    }

    if(!user.verified_number && !loading){
      navigation.navigate('/OTPVerification');
    }

  }, [loading]);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);


  const handleContinue = async (data: FormData) => {
    setIsSubmitting(true);
    // If otherSpecialization is set, use it as the specialization value
    const formdata = {
      ...data,
      specialization: otherSpecialization
        ? otherSpecialization
        : data.specialization,
    };
    const data_ = {
      token: user.usertoken,
      data: {
        formdata,
        img: imageDetails,
      },
    };

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
    
      if(res.data.user.full_name != 'Not Set') {
        navigation.navigate("/home");
      }

      setIsSubmitting(false);

      
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
    }
  };

  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        <Text
          style={[
            typography.text2XL_SemiBold,
            { textAlign: "center", marginBottom: 8 },
          ]}>
          Set up Profile
        </Text>
        <Text
          style={[
            typography.textBase_Regular,
            { textAlign: "center", marginBottom: 24 },
          ]}>
          Update your profile to get started
        </Text>

        {/* Upload Avatar */}
        <TouchableOpacity
          style={formStyles.profileImageCntr}
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

        <Text
          style={[
            typography.textXL_Medium,
            {
              marginBottom: 8,
              textAlign: "center",
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
            render={({ field: { value } }) => (
              <View
                style={[formStyles.inputCntr, formStyles.inputCntrDisabled]}>
                <SimpleLineIcons
                  name="envelope"
                  size={20}
                  color={theme.colors["neutral-700"]}
                />
                <TextInput
                  style={[formStyles.inputText, formStyles.inputTextDisabled]}
                  placeholderTextColor={theme.colors["disabled-text"]}
                  value={value}
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
            render={({ field: { value } }) => (
              <View
                style={[formStyles.inputCntr, formStyles.inputCntrDisabled]}>
                <Feather
                  name="phone"
                  size={20}
                  color={theme.colors["neutral-700"]}
                />
                <TextInput
                  style={[formStyles.inputText, formStyles.inputTextDisabled]}
                  placeholderTextColor={theme.colors["disabled-text"]}
                  value={value}
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

        <Text
          style={[
            typography.textXL_Medium,
            {
              marginTop: 12,
              marginBottom: 8,
              textAlign: "center",
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
              <>
                <View style={formStyles.inputDropdownCntr}>
                  <Picker
                    selectedValue={value}
                    onValueChange={val => {
                      onChange(val);
                      if (val !== "other") setOtherSpecialization("");
                    }}>
                    <Picker.Item label="Select one" value="" />
                    {AREAS_OF_SPECIALIZATION.map(opt => (
                      <Picker.Item
                        key={opt.name}
                        label={opt.label}
                        value={opt.name}
                      />
                    ))}
                  </Picker>
                </View>
                {value === "other" && (
                  <View style={{ marginTop: 8 }}>
                    <TextInput
                      style={formStyles.inputText}
                      placeholder="Enter your specialization"
                      value={otherSpecialization}
                      onChangeText={text => {
                        setOtherSpecialization(text);
                        onChange(text);
                      }}
                    />
                  </View>
                )}
              </>
            )}
          />
          {errors.specialization && (
            <Text style={globalStyles.errorText}>
              {errors.specialization.message?.toString()}
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
                      value === "male" ? "check-box" : "check-box-outline-blank"
                    }
                    size={20}
                    color={theme.colors["purple-700"]}
                  />
                  <Text style={formStyles.genderText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onChange("female")}
                  style={[formStyles.inputCntr, formStyles.genderOptionFemale]}>
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
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export const AREAS_OF_SPECIALIZATION = [
  { name: "anesthesiology", label: "Anesthesiology" },
  { name: "cardiology", label: "Cardiology" },
  { name: "dermatology", label: "Dermatology" },
  { name: "emergency_medicine", label: "Emergency Medicine" },
  { name: "endocrinology", label: "Endocrinology" },
  { name: "family_medicine", label: "Family Medicine" },
  { name: "gastroenterology", label: "Gastroenterology" },
  { name: "general_surgery", label: "General Surgery" },
  { name: "geriatrics", label: "Geriatrics" },
  { name: "hematology", label: "Hematology" },
  { name: "infectious_disease", label: "Infectious Disease" },
  { name: "internal_medicine", label: "Internal Medicine" },
  { name: "nephrology", label: "Nephrology" },
  { name: "neurology", label: "Neurology" },
  { name: "obstetrics_gynecology", label: "Obstetrics & Gynecology" },
  { name: "oncology", label: "Oncology" },
  { name: "orthopedics", label: "Orthopedics" },
  { name: "pediatrics", label: "Pediatrics" },
  { name: "psychiatry", label: "Psychiatry" },
  { name: "radiology", label: "Radiology" },
  { name: "other", label: "Other" },
];
