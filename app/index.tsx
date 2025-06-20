import React, { useEffect } from "react";
import { Image, View } from "react-native";
import styles from "@/styles/splashScreen";
import { useRouter } from "expo-router";


// type RootStackParamList = {
//   SplashScreen: undefined;
//   DecisionScreen: undefined;
//   Onboarding: undefined;
//   SignUp: undefined;
// };

export default function SplashScreen() {
  const navigation = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('../decision');
      // navigation.navigate("DecisionScreen");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);


  return (
         <View style={styles.container}>
        <Image
          source={require("../assets/images/whiteLogo.png")}
          onError={(error) => console.error("Image loading error:", error.nativeEvent.error)}
          style={styles.logo}
        />
        </View>          
    );
}
