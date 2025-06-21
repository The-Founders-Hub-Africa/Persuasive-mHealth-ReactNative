import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "@/styles/theme";
import globalStyles from "@/styles/global";
import typography from "@/styles/typography";
import formStyles from "@/styles/formStyles";
import { useChangePasswordMutation } from "@/integrations/features/apis/apiSlice";
import { useAppDispatch,useAppSelector } from "@/integrations/hooks";
import { addAlert } from "@/integrations/features/alert/alertSlice";
import { clearOld } from "@/integrations/features/user/boarderUserSlice";
import { useRouter } from "expo-router";

type FormData = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordScreen = () => {

  const navigation = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const old = useAppSelector(state => state.board.old);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (dataForm: FormData) => {
    let data_ = {
      'action': 'change_password',
      'old_password': old,
      'new_password' : dataForm.password,
      'token': user.usertoken
    }
    changePassword(data_).then(data => {
          if (data.error) {
            dispatch(addAlert({ ...data.error, page: "reset password page" }));
            
              }
      if (data.data) { 
             dispatch(addAlert({ ...data.data, page: "reset password page", status:200 }));
             dispatch(clearOld());
            navigation.navigate("/settings");
          }
         
        });
    
  };

  return (
    <ScrollView>
      <View style={[globalStyles.dashboardContainer, { gap: 24 }]}>
        <View style={styles.groupSection}>
          <Text style={styles.groupSectionTitle}>
            To set a new password, pleases enter a new password you will like to
            use.
          </Text>

          {/* Password Input */}
          <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>Password</Text>
            <View style={formStyles.inputCntr}>
              <MaterialIcons
                name="lock"
                size={20}
                color={theme.colors["neutral-500"]}
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
            <Text style={formStyles.label}>Confirm password</Text>
            <View style={formStyles.inputCntr}>
              <MaterialIcons
                name="lock"
                size={20}
                color={theme.colors["neutral-500"]}
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
                name="confirmPassword"
              />
            </View>
            {errors.confirmPassword && (
              <Text style={globalStyles.errorText}>
                {errors.confirmPassword?.message?.toString()}
              </Text>
            )}
          </View>

          {/* Reset password Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
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
              Save password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: theme.colors["purple-50"],
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderRadius: theme.rounded.medium,
    gap: 24,
    width: "100%",
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
  submitButton: {
    backgroundColor: "#B91C1C",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  submitText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 600,
  },

  groupSection: {
    width: "100%",
    gap: 8,
  },
  groupSectionTitle: {
    ...typography.textSmall_Medium,
    marginBottom: 8,
    textAlign: "center",
  },
  groupSectionLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    borderWidth: 1,
    borderColor: theme.colors["purple-200"],
    borderRadius: 10,
    padding: 16,
  },
  groupSectionLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  groupSectionRight: {
    alignSelf: "flex-end",
  },
});
