import typography from "@/styles/typography";
import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

const SectionHeader = ({
  title,
  onPress,
  hideViewAll,
}: {
  title: string;
  onPress: any;
  hideViewAll?: boolean;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        width: "100%",
      }}>
      <Text
        style={[
          typography.textLG_Medium,
          {
            width: "auto",
          },
        ]}>
        {title}
      </Text>

      {!hideViewAll && (
        <TouchableOpacity
          onPress={onPress}
          style={[
            typography.textSmall_Light,
            {
              width: "auto",
            },
          ]}>
          <Text>View all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;
