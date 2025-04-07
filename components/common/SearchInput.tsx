import { View, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import theme from "@/styles/theme";
import globalStyles from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import typography from "@/styles/typography";

const SearchInput = ({
  value,
  setValue,
  placeholder,
}: {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
}) => {
  return (
    <View
      style={{
        width: "100%",
      }}>
      <TouchableOpacity
        style={globalStyles.searchInputCntr}
        activeOpacity={0.7}>
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
          style={[typography.textSmall_Light, globalStyles.searchInput]}
          placeholder={placeholder}
          value={value}
          onChangeText={setValue}
          placeholderTextColor={theme.colors["neutral-500"]}
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

export default SearchInput;
