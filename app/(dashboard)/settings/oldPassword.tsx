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
import { addOld } from "@/integrations/features/user/boarderUserSlice";
import { useRouter } from "expo-router";

type FormData = {
  password: string;
};

const OldPasswordScreen = () => {
  const navigation = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (dataForm: FormData) => {
    let data_ = { 'action': 'old_password', 'old_password': dataForm.password, 'token': user.usertoken }
    
    changePassword(data_).then(data => {
      if (data.error) {
        dispatch(addAlert({ ...data.error, page: "old password page" }));
        
          }
      if (data.data) { 
        dispatch(addOld(dataForm.password));
        navigation.navigate("./resetPassword");
      }
     
    });
    
    
      // Found screens with the same name nested inside one another.Check:
      // Dashboard > Home, Dashboard > Home > Home,
        
    
  };

  return (
    <ScrollView>
      <View style={[globalStyles.dashboardContainer, { gap: 24 }]}>
        <View style={styles.groupSection}>
          <Text style={styles.groupSectionTitle}>
            To set a new password, pleases enter your current password first.
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
              Change password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default OldPasswordScreen;

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


