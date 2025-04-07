import { View, Text, SectionList } from "react-native";
import React from "react";
import { NotificationProps } from "@/types";
import theme from "@/styles/theme";
import { Feather } from "@expo/vector-icons";
import typography from "@/styles/typography";

// Helper function to format dates
const getSectionTitle = (dateString: string) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const notificationDate = new Date(dateString);

  if (notificationDate.toDateString() === today.toDateString()) {
    return "Today";
  }
  if (notificationDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(notificationDate);
};

// Function to group notifications by date
const groupNotificationsByDate = (notifications: NotificationProps[]) => {
  const grouped: { [key: string]: NotificationProps[] } = {};

  notifications.forEach(notification => {
    const sectionTitle = getSectionTitle(notification.date);
    if (!grouped[sectionTitle]) {
      grouped[sectionTitle] = [];
    }
    grouped[sectionTitle].push(notification);
  });

  return Object.keys(grouped).map(title => ({
    title,
    data: grouped[title],
  }));
};

const NotificationList = ({
  notificationsData,
}: {
  notificationsData: NotificationProps[];
}) => {
  const sections = groupNotificationsByDate(notificationsData);

  return (
    <SectionList
      sections={sections}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <NotificationsCard notification={item} />}
      renderSectionHeader={({ section }) => (
        <Text
          style={[
            typography.textXL_Medium,
            {
              marginBottom: 8,
            },
          ]}>
          {section.title}
        </Text>
      )}
      style={{
        width: "100%",
      }}
    />
  );
};

export default NotificationList;

const NotificationsCard = ({
  notification,
}: {
  notification: NotificationProps;
}) => {
  const icon = notification.type === "message" ? "message-circle" : "calendar";
  const bgColor =
    notification.type === "message"
      ? theme.colors["green-300"]
      : theme.colors["purple-300"];

  return (
    <View
      style={{
        flexDirection: "row",
        padding: 16,
        gap: 16,
      }}>
      <View
        style={{
          borderRadius: theme.rounded.full,
          backgroundColor: bgColor,
          alignItems: "center",
          justifyContent: "center",
          width: 38,
          height: 38,
        }}>
        <Feather name={icon} size={20} color={theme.colors.white} />
      </View>

      <View>
        <Text
          style={[
            typography.textBase_Regular,
            {
              marginBottom: 4,
            },
          ]}>
          {notification.title}
        </Text>
        <Text style={typography.textBase_Medium}>
          {notification.body.slice(0, 30)}...
        </Text>
      </View>
    </View>
  );
};
