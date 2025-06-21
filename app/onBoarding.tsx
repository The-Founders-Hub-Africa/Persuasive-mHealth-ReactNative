import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import theme from "@/styles/theme";
import globalStyles from "@/styles/global";
// import typography from "../styles/typography";
import formStyles from "../styles/formStyles";
import { useAppDispatch } from "@/integrations/hooks";
import { boardUser } from "../integrations/features/user/boarderUserSlice";
import { useRouter } from "expo-router";
import typography from "@/styles/typography";

const onboardingData = [
  {
    id: 1,
    image: require("@/assets/images/onboarding1-icon.png"),
    title: "Your All-in-One Healthcare Assistant",
    subTitle:
      "Manage messages, appointments, and records in one place, saving you time for what matters most",
  },
  {
    id: 2,
    image: require("@/assets/images/onboarding2-icon.png"),
    title: "Simplify Patient Care with Ease",
    subTitle:
      "Integrate your workflow with real-time EMR sync and secure multi-platform communication.",
  },
  {
    id: 3,
    image: require("@/assets/images/onboarding3-icon.png"),
    title: "Let's Get You Set Up for Success",
    subTitle:
      "Follow these simple steps to unlock seamless doctor-patient collaboration and optimize your workflow",
  },
];

export default function OnboardingScreen() {
  const navigation = useRouter();

  const [index, setIndex] = useState(0);

  const dispatch = useAppDispatch();

  const handleNext = () => {
    if (index < onboardingData.length - 1) {
      setIndex(index + 1);
    } else {
      navigation.navigate("../signUp");
      dispatch(boardUser())
    }
  };

  const handleSkip = () => {
    navigation.navigate("../signUp");
    dispatch(boardUser())
  };

  return (
          <ScrollView>
      <View style={[globalStyles.container]}>
        <Image
          source={onboardingData[index].image}
          style={{
            width: 200,
            height: 200,
            marginBottom: 24,
            alignSelf: "center",
          }}
        />

        <Text
          style={[
            typography.text2XL_SemiBold,
            {
              textAlign: "center",
              marginBottom: 8,
            },
          ]}>
          {onboardingData[index].title}
        </Text>
        <Text
          style={[
            typography.textBase_Regular,
            {
              textAlign: "center",
              marginBottom: 144,
            },
          ]}>
          {onboardingData[index].subTitle}
        </Text>

        <View style={formStyles.buttonsCntr}>
          <TouchableOpacity
            onPress={handleNext}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 40,
              borderRadius: 10,
              backgroundColor: theme.colors["purple-700"],
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: theme.colors.white,
              }}>
              {index === onboardingData.length - 1 ? "Continue" : "Next"}
            </Text>
          </TouchableOpacity>

          {index < onboardingData.length - 1 && (
            <TouchableOpacity onPress={handleSkip}>
              <Text
                style={{ fontSize: 16, color: theme.colors["neutral-700"] }}>
                Skip
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      </ScrollView>
      
  );

}
