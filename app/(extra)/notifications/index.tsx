import { View } from "react-native";
import React from "react";
import globalStyles from "@/styles/global";
import { notificationsData } from "@/helpers";
import NotificationList from "@/components/common/NotificationList";

const NotificationsScreen = () => {
  return (
    <View style={globalStyles.dashboardContainer}>
      <NotificationList notificationsData={notificationsData} />
    </View>
  );
};

export default NotificationsScreen;
