import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { MaterialIcons, SimpleLineIcons, Feather } from "@expo/vector-icons";
import globalStyles from "@/styles/global";
import theme from "@/styles/theme";
import React, { useEffect, useState } from "react";
import formStyles from "@/styles/formStyles";
import typography from "@/styles/typography";
import { loginUser } from "@/integrations/features/user/usersSlice";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { addAlert } from "@/integrations/features/alert/alertSlice";
import { useRegisterMPUserMutation } from "@/integrations/features/apis/apiSlice";
// import Alert_System from "@/src/integrations/features/alert/Alert";
import { userRegistered } from "@/integrations/features/user/boarderUserSlice";
import { useRouter } from "expo-router";

type FormData = {
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  agreed: boolean;
};

export default function SignupScreen() {
  const navigation = useRouter();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
      agreed: false,
    },
  });

  const [registerUser, { isLoading }] = useRegisterMPUserMutation();

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    if (user.logedin) {
      if (user.verified_number) {
        navigation.navigate("../home");
      } else {
        navigation.navigate("../OTPVerification");
      }
    }
  }, [user]);

  // const onSubmit = async (formdata: FormData) => {
  //   navigation.navigate("OTP Verification");
  // };

  const onSubmit = async (formdata: FormData) => {
    if (formdata.agreed) {
      const data = {
        email: formdata.email,
        phone_number: formdata.phone,
        password: formdata.password,
        specialization: "medical practitioner",
        full_name: "Not Set",
      };

      let res = await registerUser(data);
      if (res.data) {
        dispatch(
          loginUser({
            ...res.data.user,
            usertoken: res.data.token,
            logedin: true,
            save: true,
          })
        );
        dispatch(userRegistered());
        navigation.navigate("../OTPVerification");
      } else if (res.error) {
        dispatch(addAlert({ ...res.error, page: "signup" }));
      }
    }
  };

  return (
    <ScrollView>
      {/* <Alert_System /> */}
      <View style={globalStyles.container}>
        <Image
          source={require("@/assets/purpleLogoIcon.png")}
          style={globalStyles.logoRect}
        />

        <Text
          style={[
            typography.text2XL_SemiBold,
            {
              textAlign: "center",
              marginBottom: 8,
            },
          ]}>
          Create Account
        </Text>
        <Text
          style={[
            typography.textBase_Regular,
            {
              textAlign: "center",
              marginBottom: 24,
            },
          ]}>
          Fill your information below
        </Text>
        {/* Email Input */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Email</Text>
          <View style={formStyles.inputCntr}>
            <SimpleLineIcons
              name="envelope"
              size={20}
              color={theme.colors["neutral-700"]}
            />
            <Controller
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={formStyles.inputText}
                  placeholder="you@email.com"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="email"
            />
          </View>
          {errors.email && (
            <Text style={globalStyles.errorText}>
              {errors.email?.message?.toString()}
            </Text>
          )}
        </View>

        {/* Phone Number Input */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Phone Number</Text>
          <View style={formStyles.inputCntr}>
            <Feather
              name="phone"
              size={20}
              color={theme.colors["neutral-700"]}
            />
            <Controller
              control={control}
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^\+[1-9]\d{9,14}$/,
                  message: "Enter a valid phone number starting with +",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={formStyles.inputText}
                  placeholder="+264812345678"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="phone"
            />
          </View>
          {errors.phone && (
            <Text style={globalStyles.errorText}>
              {errors.phone?.message?.toString()}
            </Text>
          )}
        </View>

        {/* Password Input */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Password</Text>
          <View style={formStyles.inputCntr}>
            <Feather
              name="lock"
              size={20}
              color={theme.colors["neutral-700"]}
            />
            <Controller
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must not exceed 20 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                  message:
                    "Password must contain at least one capital letter, one small letter, one number, and one of the following special characters: @$!%*?&",
                },
                validate: value => {
                  const invalidChars = /[^A-Za-z\d@$!%*?&]/g; // Reject anything not in allowed set
                  if (invalidChars.test(value)) {
                    return "Password contains invalid special characters. Only @$!%*?& are allowed.";
                  }
                  return true;
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={formStyles.inputText}
                  placeholder="********"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="password"
            />
          </View>
          {errors.password && (
            <Text style={globalStyles.errorText}>
              {errors.password?.message?.toString()}
            </Text>
          )}
        </View>

        {/* Confirm Password Input */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Confirm Password</Text>
          <View style={formStyles.inputCntr}>
            <Feather
              name="lock"
              size={20}
              color={theme.colors["neutral-700"]}
            />
            <Controller
              control={control}
              rules={{
                required: "Confirm password is required",
                validate: (value, formValues) => {
                  if (value !== formValues.password) {
                    return "Passwords do not match";
                  }
                  return true;
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={formStyles.inputText}
                  placeholder="********"
                  placeholderTextColor={theme.colors["disabled-text"]}
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="confirm_password"
            />
          </View>
          {errors.confirm_password && (
            <Text style={globalStyles.errorText}>
              {errors.confirm_password?.message?.toString()}
            </Text>
          )}
        </View>

        {/* Terms & Conditions */}
        <Controller
          control={control}
          rules={{
            required: "You must agree to Terms & Conditions",
          }}
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity
              onPress={() => onChange(!value)}
              style={{
                flexDirection: "row",
                width: "100%",
              }}>
              <MaterialIcons
                name={value ? "check-box" : "check-box-outline-blank"}
                size={20}
                color={theme.colors["neutral-700"]}
              />
              <Text
                style={
                  (typography.textBase_Regular,
                  {
                    marginLeft: 8,
                  })
                }>
                Agree with Terms & Conditions
              </Text>
            </TouchableOpacity>
          )}
          name="agreed"
        />
        {errors.agreed && (
          <Text style={globalStyles.errorText}>
            {errors.agreed?.message?.toString()}
          </Text>
        )}

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          style={[
            formStyles.submitButton,
            {
              marginTop: 40,
              backgroundColor: isLoading
                ? theme.colors["disabled-bg"]
                : theme.colors["purple-700"],
            },
          ]}>
          <Text
            style={{
              color: isLoading
                ? theme.colors["disabled-text"]
                : theme.colors.white,
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Already have an account */}
        <View style={formStyles.infoGroup}>
          <Text style={formStyles.infoText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("../login")}>
            <Text style={formStyles.infoLink}>Login.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
