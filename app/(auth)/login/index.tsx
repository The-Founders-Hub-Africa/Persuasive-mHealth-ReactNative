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
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import globalStyles from "@/styles/global";
import theme from "@/styles/theme";
import React, { useEffect, useState } from "react";
import typography from "@/styles/typography";
import formStyles from "@/styles/formStyles";

import { useLoginMutation } from "@/integrations/features/apis/apiSlice";
import { loginUser } from "@/integrations/features/user/usersSlice";
// import { useDispatch, useSelector } from "react-redux"
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { addAlert } from "@/integrations/features/alert/alertSlice";
import { useRouter } from "expo-router";
// import Alert_System from "@/src/integrations/features/alert/Alert";

type FormData = {
  phone_number: string;
  password: string;
};

export default function LoginScreen() {
const navigation = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      phone_number: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const [loading, setLoading] = useState(true);
  const [login, { isLoading }] = useLoginMutation();
  
  useEffect(() => {
    if (user.logedin && !loading  && !isLoading) {
      if (user.verified_number && user.full_name != 'Not Set') {
        navigation.navigate("/home");
      } else if (!user.verified_number){
        navigation.navigate("/OTPVerification");
      } else if(user.full_name == 'Not Set') {
        navigation.navigate("/profileSetup");
      }
    }
  }, [loading,user]);


  useEffect(() => {
      if (user && loading) {
        setLoading(false);
      }
    }, [user]);

  const onSubmit = async (formdata: FormData) => {
    if (!formdata.phone_number && !formdata.password) {
      // remember to dispatch alert
      return;
    }

    const data = {
      phone_number: formdata.phone_number,
      password: formdata.password,
    };


    let res = await login(data);
    if (res.data) {

      dispatch(
        loginUser({
          ...res.data.user,
          usertoken: res.data.token,
          logedin: true,
          save: true,
        })
      ); 

      if(res.data.user.full_name == 'Not Set') {
        navigation.navigate("/profileSetup");
      }else{
        navigation.navigate("/home");
      }



    } else if (res.error) {
      dispatch(addAlert({ ...res.error, page: "login" }));
    }
  };

  return (
    <ScrollView>
      {/* <Alert_System /> */}
      <View style={[globalStyles.container]}>
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
          Welcome back!
        </Text>
        <Text
          style={[
            typography.textBase_Regular,
            {
              textAlign: "center",
              marginBottom: 24,
            },
          ]}>
          Sign in to continue.
        </Text>

        {/* Number Input */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Phone Number</Text>
          <View style={formStyles.inputCntr}>
            <SimpleLineIcons
              name="phone"
              size={20}
              color={theme.colors["neutral-700"]}
            />
            <Controller
              control={control}
              rules={{
                required: "Phone number is required",
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
              name="phone_number"
            />
          </View>
          {errors.phone_number && (
            <Text style={globalStyles.errorText}>
              {errors.phone_number?.message?.toString()}
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

        {/* Forgot password */}
        <TouchableOpacity
          onPress={() => navigation.navigate("/forgotPassword")}
          style={{ alignSelf: "flex-end" }}>
          <Text style={{ color: theme.colors["purple-700"], fontSize: 14 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
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
            Login
          </Text>
        </TouchableOpacity>

        {/* Don't have an account */}
        <View style={formStyles.infoGroup}>
          <Text style={formStyles.infoText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("/signUp")}>
            <Text style={formStyles.infoLink}>Sign up.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
