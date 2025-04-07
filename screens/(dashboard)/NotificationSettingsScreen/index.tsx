import { ScrollView, View, Text, StyleSheet, Switch } from "react-native";
import React, { useState } from "react";
import globalStyles from "@/styles/global";
import theme from "@/styles/theme";
import typography from "@/styles/typography";

const NotificationSettingsScreen = () => {
  const [whatsappAlerts, setWhatsappAlerts] = useState(false);
  const [alerts, setAlerts] = useState(false);
  const [systemUpdates, setSystemUpdates] = useState(false);
  const [emailMessages, setEmailMessages] = useState(false);
  const [emailSystemUpdates, setEmailSystemUpdates] = useState(false);

  return (
    <ScrollView>
      <View style={[globalStyles.dashboardContainer, { gap: 24 }]}>
        {/* Push Notifications */}
        <View style={styles.groupSection}>
          <Text style={styles.groupSectionTitle}>Push notifications</Text>

          <View style={styles.groupSectionLink}>
            <Text>New messages from WhatsApp</Text>
            <Switch
              trackColor={{
                false: theme.colors["neutral-300"],
                true: theme.colors["purple-600"],
              }}
              thumbColor={whatsappAlerts ? theme.colors.white : "#f4f3f4"}
              ios_backgroundColor={theme.colors["neutral-300"]}
              onValueChange={() => setWhatsappAlerts(prev => !prev)}
              value={whatsappAlerts}
            />
          </View>

          <View style={styles.groupSectionLink}>
            <Text>Alerts</Text>
            <Switch
              trackColor={{
                false: theme.colors["neutral-300"],
                true: theme.colors["purple-600"],
              }}
              thumbColor={alerts ? theme.colors.white : "#f4f3f4"}
              ios_backgroundColor={theme.colors["neutral-300"]}
              onValueChange={() => setAlerts(prev => !prev)}
              value={alerts}
            />
          </View>

          <View style={styles.groupSectionLink}>
            <Text>System updates</Text>
            <Switch
              trackColor={{
                false: theme.colors["neutral-300"],
                true: theme.colors["purple-600"],
              }}
              thumbColor={systemUpdates ? theme.colors.white : "#f4f3f4"}
              ios_backgroundColor={theme.colors["neutral-300"]}
              onValueChange={() => setSystemUpdates(prev => !prev)}
              value={systemUpdates}
            />
          </View>
        </View>

        {/* Email Notifications */}
        <View style={styles.groupSection}>
          <Text style={styles.groupSectionTitle}>Email notifications</Text>

          <View style={styles.groupSectionLink}>
            <Text>New messages</Text>
            <Switch
              trackColor={{
                false: theme.colors["neutral-300"],
                true: theme.colors["purple-600"],
              }}
              thumbColor={emailMessages ? theme.colors.white : "#f4f3f4"}
              ios_backgroundColor={theme.colors["neutral-300"]}
              onValueChange={() => setEmailMessages(prev => !prev)}
              value={emailMessages}
            />
          </View>

          <View style={styles.groupSectionLink}>
            <Text>System updates</Text>
            <Switch
              trackColor={{
                false: theme.colors["neutral-300"],
                true: theme.colors["purple-600"],
              }}
              thumbColor={emailSystemUpdates ? theme.colors.white : "#f4f3f4"}
              ios_backgroundColor={theme.colors["neutral-300"]}
              onValueChange={() => setEmailSystemUpdates(prev => !prev)}
              value={emailSystemUpdates}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default NotificationSettingsScreen;

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: theme.colors["purple-50"],
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderRadius: theme.rounded.medium,
    gap: 24,
    width: "100%",
  },
  section: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: theme.rounded.medium,
    backgroundColor: theme.colors["purple-100"],
  },
  bottomItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  bottomIcon: {
    width: 46,
    height: 46,
    borderRadius: theme.rounded.medium,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#B91C1C",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  submitText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 600,
  },

  groupSection: {
    width: "100%",
    gap: 8,
  },
  groupSectionTitle: {
    ...typography.textSmall_Medium,
    marginBottom: 8,
  },
  groupSectionLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    borderWidth: 1,
    borderColor: theme.colors["purple-200"],
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  groupSectionLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  groupSectionRight: {
    alignSelf: "flex-end",
  },
});
