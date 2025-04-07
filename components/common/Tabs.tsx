import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import theme from "@/styles/theme";
import typography from "@/styles/typography";

const Tabs = ({
  tabs,
}: {
  tabs: { title: string; component: JSX.Element }[];
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}>
        {/* Scrollable Tab Headers */}
        <View style={styles.tabWrapper}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveTab(index)}
              style={[
                typography.textSmall_Medium,
                styles.tabButton,
                activeTab === index && styles.activeTabButton,
              ]}>
              <Text
                style={[
                  typography.textSmall_Medium,
                  styles.tabText,
                  activeTab === index && styles.activeTabText,
                ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.contentContainer}>{tabs[activeTab].component}</View>
      </ScrollView>
    </View>
  );
};

export default Tabs;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  wrapper: {
    flexDirection: "column",
    width: "100%",
  },
  tabWrapper: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: theme.colors["zinc-300"],
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors["zinc-300"],
    maxWidth: "50%",
    height: 50,
  },
  activeTabButton: {
    borderBottomColor: theme.colors["purple-700"],
  },
  tabText: {
    fontSize: 16,
    textAlign: "center",
    color: theme.colors["neutral-700"],
  },
  activeTabText: {
    fontWeight: "bold",
    color: theme.colors["purple-700"],
  },
  contentContainer: {
    marginTop: 16,
  },
});
