import { ScrollView, View, Text, StyleSheet } from "react-native";
import React from "react";
import globalStyles from "@/styles/global";
import theme from "@/styles/theme";
import typography from "@/styles/typography";

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView>
      <View style={[globalStyles.dashboardContainer, { gap: 24 }]}>
        <View style={{ gap: 2, width: "100%" }}>
          <Text style={styles.title}>Introduction</Text>
          <Text style={styles.paragraph}>
            Welcome to Persuasive m-Health, your trusted digital healthcare
            assistant. Your privacy and data security are our top priorities.
            This Privacy Policy explains how we collect, use, and protect your
            personal health information when you use our app. By using our
            services, you agree to this policy.
          </Text>

          <Text style={styles.title}>Information We Collect</Text>
          <Text style={styles.paragraph}>
            To provide seamless healthcare services, we collect the following
            data:
          </Text>
          <Text style={styles.paragraph}>
            - Personal Information: Name, contact details, date of birth, gender.
          </Text>
          <Text style={styles.paragraph}>
            - Health Information: Symptoms, medical history, prescriptions, doctor
            consultations.
          </Text>
          <Text style={styles.paragraph}>
            - Device & Usage Data: IP address, device type, browsing behavior.
          </Text>
          <Text style={styles.paragraph}>
            - Communication Data: Messages, voice/video call logs (not recorded
            unless consented).
          </Text>

          <Text style={styles.title}>How We Use Your Information</Text>
          <Text style={styles.paragraph}>We use your data strictly for:</Text>
          <Text style={styles.paragraph}>
            - Facilitating doctor-patient communication.
          </Text>
          <Text style={styles.paragraph}>
            - Syncing with electronic medical records (EMRs).
          </Text>
          <Text style={styles.paragraph}>
            - Appointment scheduling and reminders.
          </Text>
          <Text style={styles.paragraph}>
            - Providing AI-powered health insights.
          </Text>
          <Text style={styles.paragraph}>
            - Ensuring compliance with medical and legal standards.
          </Text>

          <Text style={styles.title}>Data Security & Protection</Text>
          <Text style={styles.paragraph}>
            We implement strict measures, including:
          </Text>
          <Text style={styles.paragraph}>
           - End-to-end encryption for all communications.
          </Text>
          <Text style={styles.paragraph}>
            - Secure cloud storage compliant with HIPAA and GDPR.
          </Text>
          <Text style={styles.paragraph}>
            - Multi-factor authentication to prevent unauthorized access.
          </Text>

          <Text style={styles.title}>Data Sharing & Third-Party Services</Text>
          <Text style={styles.paragraph}>
            We do not sell your data. We only share information with:
          </Text>
          <Text style={styles.paragraph}>
            - Your authorized healthcare provider(s).
          </Text>
          <Text style={styles.paragraph}>
            - Regulatory bodies (if legally required).
          </Text>
          <Text style={styles.paragraph}>
            - Trusted third-party integrations (e.g., EMR platforms), with
            explicit consent.
          </Text>

          <Text style={styles.title}>Your Privacy Rights</Text>
          <Text style={styles.paragraph}>
            You have full control over your data, including:
          </Text>
          <Text style={styles.paragraph}>
            - Access & Download: Request a copy of your data.
          </Text>
          <Text style={styles.paragraph}>
            - Correction & Updates: Modify incorrect health records.
          </Text>
          <Text style={styles.paragraph}>
            - Deletion: Request to delete your account and associated data.
          </Text>
          <Text style={styles.paragraph}>
            - Opt-Out: Control notifications and data-sharing preferences.
          </Text>

          <Text style={styles.title}>Compliance & Regulations</Text>
          <Text style={styles.paragraph}>
            Persuasive m-Health complies with:
          </Text>
          <Text style={styles.paragraph}>
            - HIPAA (Health Insurance Portability and Accountability Act) for U.S.
            users.
          </Text>
          <Text style={styles.paragraph}>
            - GDPR (General Data Protection Regulation) for European users.
          </Text>

          <Text style={styles.title}>Updates to This Policy</Text>
          <Text style={styles.paragraph}>
            We may update this Privacy Policy periodically. You will be notified
            of significant changes via email or in-app alerts.
          </Text>

          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.paragraph}>
            For any privacy concerns or inquiries, contact us at:
          </Text>
          <Text style={styles.paragraph}>Email: privacy@[yourapp].com</Text>
          <Text style={styles.paragraph}>Address: [Company Address]</Text>

          <Text style={styles.paragraph}>
            By using Persuasive m-Health, you acknowledge and agree to this
            Privacy Policy.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  title: { ...typography.textLG_Medium, marginVertical: 4 },
  paragraph: {
    ...typography.textSmall_Regular,
    color: theme.colors["neutral-500"],
  },
});
