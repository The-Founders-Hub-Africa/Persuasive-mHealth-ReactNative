import { ScrollView, View, Text, StyleSheet } from "react-native";
import React from "react";
import globalStyles from "@/styles/global";
import theme from "@/styles/theme";
import typography from "@/styles/typography";

const FAQScreen = () => {
  return (
    <ScrollView>
      <View style={[globalStyles.dashboardContainer, { gap: 24 }]}>
        <Text style={styles.title}>Have questions? We are here to help.</Text>

        {/* FAQs */}
        <View
          style={{
            gap: 16,
            width: "100%",
          }}>
          {[1, 1, 1].map((_, index) => (
            <View key={index}>
              <Text style={{ ...typography.textLG_Medium, marginBottom: 8 }}>
                How do I reset my password?
              </Text>
              <Text
                style={[
                  typography.textSmall_Regular,
                  { color: theme.colors["neutral-500"] },
                ]}>
                To reset your password, click on the "Forgot password?" link on
                the login page. You will be asked to enter your email address
                and a password reset link will be sent to your email.
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({
  title: {
    ...typography.textXL_Medium,
    marginBottom: 16,
  },
});
