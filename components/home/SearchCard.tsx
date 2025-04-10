import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import theme from "@/styles/theme";
import globalStyles from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import typography from "@/styles/typography";
import { useRouter } from "expo-router";

const SearchCard = () => {
  const navigation = useRouter();

  return (
    <View
      style={{
        borderRadius: theme.rounded.medium,
        backgroundColor: theme.colors["purple-700"],
        width: "100%",
        paddingVertical: 22,
        paddingHorizontal: 24,
        gap: 24,
        marginBottom: 18,
      }}>
        
      <Text
        style={
          (typography.textXL_SemiBold,
          {
            color: theme.colors.white,
          })
        }>
        Let's Get You Set Up for Success.
      </Text>

      <TouchableOpacity
        style={globalStyles.searchInputCntr}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("../search")}>
        <View
          style={[
            globalStyles.searchIconCntr,
            {
              borderRightWidth: 1,
            },
          ]}>
          <Ionicons
            name="search"
            size={16}
            color={theme.colors["neutral-500"]}
          />
        </View>
        <TextInput
          style={[
            typography.textSmall_Light,
            globalStyles.searchInput,
            {
              borderColor: "#E5E7EB",
            },
          ]}
          placeholder="Search..."
          placeholderTextColor={theme.colors["neutral-500"]}
          editable={false}
        />
        <View
          style={[
            globalStyles.searchIconCntr,
            {
              borderLeftWidth: 1,
            },
          ]}>
          <Ionicons
            name="filter"
            size={20}
            color={theme.colors["purple-700"]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchCard;
