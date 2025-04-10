import React, { useEffect} from "react";
import { Image, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import styles from "@/styles/splashScreen";
import { useRouter } from "expo-router";


export default function DecisionScreen() {
  const navigation = useRouter();
 console.log('Decision Screen')
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
   const board = useAppSelector(state => state.board);

   useEffect(() => {
    const timeout = setTimeout(() => {
    if (user.logedin) {
      if (user.verified_number && user.full_name != 'Not Set') {
        navigation.replace("../home")
      } else if (user.full_name == 'Not Set') {
        navigation.replace("../profileSetup")
      }else {
        navigation.replace("../OTPVerification")
      }
    } else {

      if (board.navigate && board.boarded && board.registered) {
        navigation.replace("../login")
      } else if (board.navigate && board.boarded) {
        navigation.replace("../signUp")
      } else if(board.navigate && !board.boarded) {
        navigation.replace("../onBoarding")
      }
      
    }
  }, 0); // Ensure navigation happens after the app is ready

  return () => clearTimeout(timeout); // Cleanup timeout
    
  }, [user,board]);


  


  return (
       <View style={styles.container}>
      <Image
        source={require("../../assets/images/whiteLogo.png")}
        style={styles.logo}
      />
      </View>          
  );

}
