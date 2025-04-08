import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
import React from "react";
import theme from "@/styles/theme";
import globalStyles from "@/styles/global";
import typography from "@/styles/typography";
import formStyles from "@/styles/formStyles";
import { useRouter } from "expo-router";

type FormData = {
  email: string;
};

export default function ForgotPasswordScreen() {
  
  const navigation = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: FormData) => {
    if (data.email) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setEmailSent(true);
      }, 3000);
    } else {
      Alert.alert("Please fill all fields");
    }
  };

  const handleOpenEmailApp = () => {
    navigation.navigate("../resetPassword");
  };

  return (
    <ScrollView>
      {!emailSent ? (
        <View style={globalStyles.container}>
          <Text
            style={[
              typography.text2XL_SemiBold,
              {
                textAlign: "left",
                marginBottom: 8,
              },
            ]}>
            Reset password
          </Text>
          <Text
            style={[
              typography.textBase_Regular,
              {
                textAlign: "left",
                marginBottom: 24,
              },
            ]}>
            Enter the email associated with your account and we will send you an
            email wih instructions to reset your password
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

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
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
              Send instructions
            </Text>
          </TouchableOpacity>

          {/* Remembered your password */}
          <View style={formStyles.infoGroup}>
            <Text style={formStyles.infoText}>Remembered your password? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("../login")}>
              <Text style={formStyles.infoLink}>Login here.</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={globalStyles.container}>
          <Image
            source={require("@/assets/images/email-verification-icon.png")}
            style={globalStyles.squareImage}
          />
          <Text
            style={[
              typography.text2XL_SemiBold,
              {
                textAlign: "center",
                marginBottom: 8,
              },
            ]}>
            Check your mail
          </Text>
          <Text
            style={[
              typography.textBase_Regular,
              {
                textAlign: "center",
                marginBottom: 24,
              },
            ]}>
            We have sent a password recovery instruction to your email.
          </Text>
          <TouchableOpacity
            onPress={handleOpenEmailApp}
            style={formStyles.submitButton}>
            <Text style={formStyles.submitText}>Open email app</Text>
          </TouchableOpacity>

          <Text
            style={[
              formStyles.infoGroup,
              {
                textAlign: "center",
              },
            ]}>
            Didn't receive any mail, check your spam filter or try another email
            address
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
