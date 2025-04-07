import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { logoutUser } from "../user/usersSlice"
import { useEffect } from "react"
import Toast from "toastify-react-native";
import { clearAlert } from "./alertSlice";
import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { View } from "react-native";

const Alert_System = () => {

  const navigation = useNavigation<NavigationProp<any>>();

    const dispatch = useAppDispatch();
    const alert = useAppSelector(state => state.alert);
    
    useEffect(() => {
      if (alert.status_code > 0) {
        console.log(alert.status_code)
        if(alert.status_code === 401){
          dispatch(logoutUser())
          navigation.navigate('Login')
        }
        // let type = alert.status_code === 200 ? 'success' : 'error'
        for (const message of alert.message) {
          console.log('message from alert', message)
          if (alert.status_code === 200) {
            Toast.success(message)
          } else {
            Toast.error(message)
          }
          
            // Toast.show({
            //     type: type,
            //   text1: message,
                
            // });
          
          

          // Removed invalid Toast.setRef block
          
        }
        console.log('alert_system',alert)
        dispatch(clearAlert())
      }
    }, [alert])
  
  return (
    // <React.Fragment></React.Fragment>
    <View></View>
  )
}

export default Alert_System

