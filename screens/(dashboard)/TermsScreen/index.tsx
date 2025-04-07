import { ScrollView, View, Text, StyleSheet } from "react-native";
import React from "react";
import globalStyles from "@/styles/global";
import theme from "@/styles/theme";
import typography from "@/styles/typography";

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView>
      <View style={[globalStyles.dashboardContainer, { gap: 24 }]}>
        <View style={{ gap: 12, width: "100%" }}>
          <Text style={styles.title}>Introduction</Text>
          <Text style={styles.paragraph}>
            Persuasive m-Health is a digital health platform designed to
            streamline doctor-patient communication across multiple channels
            (WhatsApp, SMS, video calls, email, and more) while integrating with
            Electronic Medical Records (EMRs).
          </Text>
          <Text style={styles.paragraph}>
            These Terms apply to all users (doctors, patients, healthcare
            professionals, and other authorized users).
          </Text>

          <Text style={styles.title}>User Eligibility</Text>
          <Text style={styles.paragraph}>
            To use Persuasive m-Health, you must:
          </Text>
          <Text style={styles.paragraph}>
            - Be at least 18 years old (or have parental consent if applicable).
          </Text>
          <Text style={styles.paragraph}>
            - Use the app for legitimate healthcare purposes only.
          </Text>
          <Text style={styles.paragraph}>
            - Provide accurate personal and medical information.
          </Text>
          <Text style={styles.paragraph}>
            If you violate these Terms, we may suspend or terminate your
            account.
          </Text>

          <Text style={styles.title}>Medical Disclaimer</Text>
          <Text style={styles.paragraph}>
            Persuasive m-Health is NOT a substitute for professional medical
            advice, diagnosis, or treatment. While we facilitate healthcare
            communication, any medical decisions should be made between you and
            your licensed healthcare provider.
          </Text>
          <Text style={styles.paragraph}>
            In case of a medical emergency, call emergency services immediately.
          </Text>

          <Text style={styles.title}>Privacy & Data Protection</Text>
          <Text style={styles.paragraph}>
            We take data privacy seriously and comply with:
          </Text>
          <Text style={styles.paragraph}>- HIPAA (for U.S. users)</Text>
          <Text style={styles.paragraph}>- GDPR (for EU users)</Text>
          <Text style={styles.paragraph}>
            - Other applicable healthcare privacy laws
          </Text>
          <Text style={styles.paragraph}>Your data is:</Text>
          <Text style={styles.paragraph}>- Encrypted & securely stored</Text>
          <Text style={styles.paragraph}>- Never sold to third parties</Text>
          <Text style={styles.paragraph}>- Shared only with your consent</Text>
          <Text style={styles.paragraph}>
            For details, please read our [Privacy Policy].
          </Text>

          <Text style={styles.title}>Acceptable Use Policy</Text>
          <Text style={styles.paragraph}>
            When using Persuasive m-Health, you agree NOT to:
          </Text>
          <Text style={styles.paragraph}>
            - Impersonate another user or provide false information.
          </Text>
          <Text style={styles.paragraph}>
            - Use the platform for fraud, harassment, or unauthorized access.
          </Text>
          <Text style={styles.paragraph}>
            - Share confidential patient data without consent.
          </Text>
          <Text style={styles.paragraph}>
            - Attempt to hack, disrupt, or misuse the system.
          </Text>
          <Text style={styles.paragraph}>
            Any violation may result in immediate termination of access.
          </Text>

          <Text style={styles.title}>Account Security</Text>
          <Text style={styles.paragraph}>
            You are responsible for keeping your login credentials secure.
          </Text>
          <Text style={styles.paragraph}>
            Two-Factor Authentication (2FA) is recommended for added security.
          </Text>
          <Text style={styles.paragraph}>
            If you suspect unauthorized access, report it immediately to
            support@[yourapp].com.
          </Text>

          <Text style={styles.title}>
            Payments & Subscription (If Applicable)
          </Text>
          <Text style={styles.paragraph}>
            If our app includes paid features:
          </Text>
          <Text style={styles.paragraph}>
            - Payments are securely processed via third-party providers.
          </Text>
          <Text style={styles.paragraph}>
            - Subscription renewals will occur automatically unless canceled.
          </Text>
          <Text style={styles.paragraph}>
            - No refunds for partially used subscription periods.
          </Text>

          <Text style={styles.title}>Service Availability & Limitations</Text>
          <Text style={styles.paragraph}>
            While we strive for 99.9% uptime, we cannot guarantee uninterrupted
            service due to:
          </Text>
          <Text style={styles.paragraph}>- Maintenance updates</Text>
          <Text style={styles.paragraph}>- Third-party service outages</Text>
          <Text style={styles.paragraph}>- Unforeseen technical issues</Text>
          <Text style={styles.paragraph}>
            We are not liable for any damages due to temporary service
            disruptions.
          </Text>

          <Text style={styles.title}>Termination & Account Suspension</Text>
          <Text style={styles.paragraph}>
            We may suspend or terminate your account if you:
          </Text>
          <Text style={styles.paragraph}>- Violate these Terms</Text>
          <Text style={styles.paragraph}>- Misuse the platform</Text>
          <Text style={styles.paragraph}>
            - Engage in fraudulent activities
          </Text>
          <Text style={styles.paragraph}>
            You may also request to delete your account via Settings &gt;
            Account &gt; Delete Account or by contacting support@[yourapp].com.
          </Text>

          <Text style={styles.title}>Intellectual Property</Text>
          <Text style={styles.paragraph}>
            All content, branding, software, and trademarks on [Your mHealth App
            Name] belong to us or our licensors. You may not copy, distribute,
            or modify any part of our app without permission.
          </Text>

          <Text style={styles.title}>Liability & Disclaimer</Text>
          <Text style={styles.paragraph}>
            We do not guarantee medical outcomes or diagnosis accuracy.
          </Text>
          <Text style={styles.paragraph}>
            We are not responsible for any decisions made based on app
            interactions.
          </Text>
          <Text style={styles.paragraph}>
            Your use of the app is at your own risk.
          </Text>
          <Text style={styles.paragraph}>
            To the fullest extent permitted by law, we disclaim any liability
            for direct, indirect, or consequential damages arising from your use
            of the app.
          </Text>

          <Text style={styles.title}>Changes to Terms</Text>
          <Text style={styles.paragraph}>
            We may update these Terms & Conditions periodically. Any changes
            will be:
          </Text>
          <Text style={styles.paragraph}>- Notified in-app or via email</Text>
          <Text style={styles.paragraph}>
            - Effective immediately upon posting
          </Text>
          <Text style={styles.paragraph}>
            By continuing to use Persuasive m-Health, you agree to the revised
            Terms.
          </Text>

          <Text style={styles.title}>Governing Law & Dispute Resolution</Text>
          <Text style={styles.paragraph}>
            These Terms are governed by [Applicable Law Based on User Location].
            Any disputes shall be resolved through:
          </Text>
          <Text style={styles.paragraph}>
            - Mediation first (where possible)
          </Text>
          <Text style={styles.paragraph}>
            - Arbitration or court proceedings (if necessary)
          </Text>

          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.paragraph}>
            For legal inquiries or support, contact us at:
          </Text>
          <Text style={styles.paragraph}>Email: legal@[yourapp].com</Text>
          <Text style={styles.paragraph}>Address: [Company Address]</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  title: { ...typography.textLG_Medium },
  paragraph: {
    ...typography.textSmall_Regular,
    color: theme.colors["neutral-500"],
  },
});
