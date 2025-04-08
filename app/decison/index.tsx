import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import theme from "@/styles/theme";
import globalStyles from "@/styles/global";
import typography from "../../styles/typography";
import formStyles from "../../styles/formStyles";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { boardUser } from "../../integrations/features/user/boarderUserSlice";
import styles from "@/styles/splashScreen";
import { useRouter } from "expo-router";


export default function DecisionScreen() {
  const navigation = useRouter();
 console.log('Decision Screen')
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
   const board = useAppSelector(state => state.board);

   useEffect(() => {
    if (user.logedin) {
      if (user.verified_number && user.full_name != 'Not Set') {
        // navigation.navigate("Dashboard");
        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      } else if (user.full_name == 'Not Set') {
        // navigation.navigate("Profile Setup");
        navigation.reset({
          index: 0,
          routes: [{ name: "Profile Setup" }],
        });
        navigation.replace("../Profile Setup"),
      }else {
        // navigation.navigate("OTP Verification");
        navigation.reset({
          index: 0,
          routes: [{ name: "OTP Verification" }],
        });
      }
    } else {

      if (board.navigate && board.boarded && board.registered) {
        // navigation.navigate("Login");
        //  navigation.reset({
        //   index: 0,
        //   routes: [{ name: "Login" }],
        // });
        navigation.replace("../Login"),
      } else if (board.navigate && board.boarded) {
        // navigation.navigate("Signup");
        //  navigation.reset({
        //   index: 0,
        //   routes: [{ name: "Signup" }],
        // });
        navigation.replace("../Signup"),
      } else if(board.navigate && !board.boarded) {
        // navigation.navigate("Onboarding");
        //  navigation.reset({
        //   index: 0,
        //   routes: [{ name: "Onboarding" }],
         
        // });
        navigation.replace("../Onboarding"),
      }
      
    }
  }, [user,board]);

  


  return (
     
       <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />
      </View>
               
  );

}
