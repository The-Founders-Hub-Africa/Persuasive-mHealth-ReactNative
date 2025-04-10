import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import typography from "@/styles/typography";
import theme from "@/styles/theme";
import { MessageProps } from "@/types";
import { useRouter } from "expo-router";


const MessageList = ({ messagesData }: { messagesData: MessageProps[] }) => {
  return (
    <View style={{ width: "100%" }}>
      {messagesData.map((message, index) => (
        <MessageCard key={index} message={message} />
      ))}
    </View>
  );
};

export default MessageList;

const MessageCard = ({ message }: { message: MessageProps }) => {
  const navigation = useRouter()
  return (
    <TouchableOpacity
      onPress={() => navigation.push({pathname:"../messageDetails", params: { id: message.id,name:message.full_name }})}
      style={{
      marginBottom: 24,
      }}>
      <View
      style={{
        flexDirection: "row",
        gap: 16,
      }}>
      <Image
        source={require("@/assets/images/avatar.png")}
        style={{
        width: 46,
        height: 46,
        borderRadius: theme.rounded.medium,
        backgroundColor: theme.colors["purple-100"],
        }}
      />

      <View>
        <Text
        style={[
          typography.textBase_Medium,
          {
          marginBottom: 4,
          },
        ]}>
        {message.full_name}
        </Text>
        <Text style={typography.textBase_Regular}>
        {message.record_type == 'text' ? message.content.slice(0, 35) : message.record_type}
        {message.record_type == 'text' ? '....' : ''}
        ...
        </Text>
      </View>
      </View>
    </TouchableOpacity>
  );
};
