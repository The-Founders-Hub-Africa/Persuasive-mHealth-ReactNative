import React, { useEffect } from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  SplashScreen: undefined;
  DecisionScreen: undefined;
  Onboarding: undefined;
  Signup: undefined;
};

export default function SplashScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "DecisionScreen" }],
      });
      // navigation.navigate("DecisionScreen");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/whiteLogo.png")}
        style={styles.logo}
      />
    </View>
  );
}
