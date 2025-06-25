import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import theme from "@/styles/theme";
import globalStyles from "@/styles/global";
import typography from "@/styles/typography";
import formStyles from "@/styles/formStyles";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { useOTPMutation } from "@/integrations/features/apis/apiSlice";
import { addAlert } from "@/integrations/features/alert/alertSlice";
import {
  loginUser,
  logoutUser,
} from "@/integrations/features/user/usersSlice";
import ModalPopup from "@/components/common/ModalPopup";
import { useRouter } from "expo-router";
// import Alert_System from "@/src/integrations/features/alert/Alert";

type FormData = {
  otp0: string;
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
};

export default function OTPVerificationScreen() {
  const navigation = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      otp0: "",
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
    },
  });

  const [OTP, { isLoading }] = useOTPMutation();

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // const handleGetOTP = async () => {
  //   setOtpSent(true);
  // };

  const handleGetOTP = async () => {
    let data_ = { token: user.usertoken, otp: "", action: "get" };
    let res = await OTP(data_);
    if (res.data) {
      dispatch(
        addAlert({
          status: 200,
          message: "OTP Sent",
        })
      );
      setOtpSent(true);
      setResendTimer(90);
    } else if (res.error) {
      dispatch(addAlert({ ...res.error, page: "otp" }));
    }
  };

  // const handleVerifyOTP = async (data: { [s: string]: unknown }) => {
  //   setShowModal(true);
  // };

  const handleVerifyOTP = async (data: { [s: string]: unknown }) => {
    const otpCode = Object.values(data).join("").trim();
    let data_ = { token: user.usertoken, otp: otpCode, action: "verify" };

    let res = await OTP(data_);
    if (res.data) {
      setShowModal(true);
      dispatch(
        // loginUser({ ...user, verified_number: true, logedin: true, save: true })
        logoutUser()
      );
      navigation.replace('./login')
    } else if (res.error) {
      dispatch(addAlert({ ...res.error, page: "otp" }));
    }
  };

  return (
    <ScrollView>
      {/* <Alert_System/> */}
      <View style={globalStyles.container}>
        <Image
          source={require("@/assets/images/otp-icon.png")}
          style={globalStyles.squareImage}
        />
        <Text
          style={[
            typography.text2XL_SemiBold,
            {
              textAlign: "left",
              marginBottom: 8,
            },
          ]}>
          OTP Verification
        </Text>
        {!otpSent ? (
          <>
            <Text
              style={[
                typography.textBase_Regular,
                {
                  textAlign: "left",
                  marginBottom: 24,
                },
              ]}>
              We will send you a one-time password to your registered email address.
            </Text>

            {/* Phone Number Input */}
            <View style={formStyles.inputGroup}>
              <Text style={formStyles.label}>Email</Text>
              <View
                style={[formStyles.inputCntr, formStyles.inputCntrDisabled]}>
                <FontAwesome
                  name="envelope"
                  size={20}
                  color={theme.colors["neutral-700"]}
                />
                <TextInput
                  style={[formStyles.inputText, formStyles.inputTextDisabled]}
                  value={user.email}
                  editable={false}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={handleGetOTP}
              disabled={isLoading}
              style={[
                formStyles.submitButton,
                {
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
                Get OTP
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text
              style={[
                typography.textBase_Regular,
                {
                  textAlign: "left",
                  marginBottom: 24,
                },
              ]}>
              Enter the code sent to your mobile number.
            </Text>
            {/* OTP Input Fields */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 16,
              }}>
              {[0, 1, 2, 3, 4, 5].map(index => (
                <Controller
                  key={index}
                  control={control}
                  name={`otp${index}` as keyof FormData} // 👈 Explicitly cast to the valid keys
                  rules={{
                    required: "Required",
                    pattern: { value: /\d/, message: "Only numbers allowed" },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      ref={el => (inputRefs.current[index] = el)}
                      style={{
                        width: 40,
                        height: 62,
                        backgroundColor: theme.colors["purple-100"],
                        borderRadius: 8,
                        textAlign: "center",
                        fontSize: 14,
                        color: theme.colors["neutral-500"],
                      }}
                      keyboardType="numeric"
                      maxLength={1}
                      value={value}
                      onChangeText={text => {
                        onChange(text);
                        if (text && index < 5)
                          inputRefs.current[index + 1]?.focus();
                      }}
                    />
                  )}
                />
              ))}
            </View>
            {errors.otp0 && (
              <Text style={globalStyles.errorText}>OTP is required</Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit(handleVerifyOTP)}
              disabled={isLoading}
              style={[
                formStyles.submitButton,
                {
                  marginTop: 24,
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
                Verify OTP
              </Text>
            </TouchableOpacity>

            {/* Resend OTP */}
            <View style={formStyles.infoGroup}>
              <Text style={formStyles.infoText}>Didn't receive the OTP? </Text>
              <TouchableOpacity
                disabled={resendTimer > 0}
                onPress={handleGetOTP}>
                <Text
                  style={[
                    formStyles.infoLink,
                    resendTimer > 0 && formStyles.inputTextDisabled,
                  ]}>
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Success Modal */}
        <ModalPopup
          title="Success!"
          message="Your account was successfully verified, continue to login."
          showModal={showModal}
          setShowModal={setShowModal}
          onPress={() => {
            setShowModal(false);
            // navigation.navigate("Profile Setup");
          }}
        />
      </View>
    </ScrollView>
  );
}
