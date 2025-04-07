import { ScrollView, View, Text, StyleSheet } from "react-native";
import React from "react";
import globalStyles from "@/styles/global";
import theme from "@/styles/theme";
import typography from "@/styles/typography";

const SupportScreen = () => {
  return (
    <ScrollView>
      <View style={[globalStyles.dashboardContainer, { gap: 24 }]}>
        <View style={{ gap: 12, width: "100%" }}>
          <Text style={styles.title}>Introduction</Text>
          <Text style={styles.paragraph}>
            Welcome to Persuasive m-Health. We are committed to providing a
            secure, user-friendly, and legally compliant platform that enhances
            healthcare communication. This document outlines our Support & Legal
            Policy, ensuring transparency in how we operate and assist you.
          </Text>

          <Text style={styles.title}>2. Support Policy</Text>

          <Text style={styles.subTitle}>2.1 Customer Support</Text>
          <Text style={styles.paragraph}>
            We offer 24/7 customer support to help you with:
          </Text>
          <Text style={styles.paragraph}>
            - Technical issues (app functionality, login problems).
          </Text>
          <Text style={styles.paragraph}>
            - Account management (password reset, data access).
          </Text>
          <Text style={styles.paragraph}>
            - Troubleshooting EMR integrations.
          </Text>
          <Text style={styles.paragraph}>
            - Appointment scheduling and reminders.
          </Text>
          <Text style={styles.paragraph}>
            - Any privacy or security concerns.
          </Text>

          <Text style={styles.paragraph}>
            Email Support: support@[yourapp].com
          </Text>
          <Text style={styles.paragraph}>
            Phone Support: [Insert Support Number]
          </Text>
          <Text style={styles.paragraph}>
            Live Chat: Available in-app and on our website.
          </Text>

          <Text style={styles.subTitle}>2.2 Response Time</Text>
          <Text style={styles.paragraph}>
            We aim to respond to all inquiries within:
          </Text>
          <Text style={styles.paragraph}>
            - 24 hours for general support requests.
          </Text>
          <Text style={styles.paragraph}>
            - 2-4 hours for urgent technical issues.
          </Text>
          <Text style={styles.paragraph}>
            - Immediate support for medical data access emergencies.
          </Text>

          <Text style={styles.subTitle}>2.3 User Responsibilities</Text>
          <Text style={styles.paragraph}>
            To ensure smooth support assistance:
          </Text>
          <Text style={styles.paragraph}>
            - Provide accurate information regarding your issue.
          </Text>
          <Text style={styles.paragraph}>
            - Do not share sensitive medical data over unsecured channels.
          </Text>
          <Text style={styles.paragraph}>
            - Follow provided troubleshooting steps before escalation.
          </Text>

          <Text style={styles.title}>3. Legal Policy</Text>

          <Text style={styles.subTitle}>3.1 Terms of Use</Text>
          <Text style={styles.paragraph}>
            By using Persuasive m-Health, you agree to:
          </Text>
          <Text style={styles.paragraph}>
            - Use the platform for lawful healthcare purposes only.
          </Text>
          <Text style={styles.paragraph}>
            - Respect doctor-patient confidentiality.
          </Text>
          <Text style={styles.paragraph}>
            - Not misuse the service for false claims, fraud, or unauthorized
            access.
          </Text>

          <Text style={styles.subTitle}>3.2 Data Privacy & Compliance</Text>
          <Text style={styles.paragraph}>We comply with:</Text>
          <Text style={styles.paragraph}>
            - HIPAA (Health Insurance Portability and Accountability Act) for
            U.S. users.
          </Text>
          <Text style={styles.paragraph}>
            - GDPR (General Data Protection Regulation) for European users.
          </Text>
          <Text style={styles.paragraph}>
            - Local healthcare regulations in other jurisdictions.
          </Text>

          <Text style={styles.paragraph}>Your health data is:</Text>
          <Text style={styles.paragraph}>- Encrypted & stored securely.</Text>
          <Text style={styles.paragraph}>- Never sold to third parties.</Text>
          <Text style={styles.paragraph}>
            - Shared only with authorized healthcare providers with your
            consent.
          </Text>

          <Text style={styles.subTitle}>3.3 Liability Disclaimer</Text>
          <Text style={styles.paragraph}>
            Persuasive m-Health provides health information and communication
            tools, but it does not replace professional medical advice. We are
            not liable for:
          </Text>
          <Text style={styles.paragraph}>
            - Medical decisions made based on app content.
          </Text>
          <Text style={styles.paragraph}>
            - User misuse of provided health insights.
          </Text>
          <Text style={styles.paragraph}>
            - Third-party service interruptions affecting communication.
          </Text>

          <Text style={styles.title}>Intellectual Property</Text>
          <Text style={styles.paragraph}>
            All content, logos, trademarks, and technology on [Your mHealth App
            Name] are protected under copyright and intellectual property laws.
            Unauthorized use or duplication is strictly prohibited.
          </Text>

          <Text style={styles.title}>Termination of Service</Text>
          <Text style={styles.paragraph}>
            We reserve the right to suspend or terminate accounts that:
          </Text>
          <Text style={styles.paragraph}>
            - Violate our policies (e.g., fraudulent use, data breaches).
          </Text>
          <Text style={styles.paragraph}>
            - Misuse the app (e.g., harass doctors or patients).
          </Text>
          <Text style={styles.paragraph}>
            - Pose security threats to our platform.
          </Text>

          <Text style={styles.title}>Updates to This Policy</Text>
          <Text style={styles.paragraph}>
            We may update our Support & Legal Policy to comply with regulations
            and improve user experience. Users will be notified of significant
            changes via email or in-app notifications.
          </Text>

          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.paragraph}>
            For legal inquiries or support, contact us at:
          </Text>
          <Text style={styles.paragraph}>Email: legal@[yourapp].com</Text>
          <Text style={styles.paragraph}>Address: [Company Address]</Text>

          <Text style={styles.paragraph}>
            By using [Your mHealth App Name], you acknowledge and agree to this
            Support & Legal Policy.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  title: { ...typography.textLG_Medium },
  subTitle: { ...typography.textLG_Medium, marginTop: 10 },
  paragraph: {
    ...typography.textSmall_Regular,
    color: theme.colors["neutral-500"],
  },
});
