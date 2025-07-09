import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Linking,
} from "react-native";
import React from "react";
import theme from "@/styles/theme";
import { Entypo, Feather } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import typography from "@/styles/typography";
import formStyles from "@/styles/formStyles";
import globalStyles from "@/styles/global";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { baseUrl } from "@/integrations/features/apis/apiSlice";
import { useRouter } from "expo-router";

const ViewProfileScreen = () => {
  const navigation = useRouter()

  const handleEditProfile = () => {
    navigation.navigate("../editProfile");
  };

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  return (
    <ScrollView>
      <View style={[globalStyles.dashboardContainer, { gap: 24 }]}>
        {/* Top card */}
        <View style={styles.container}>
          {/* Top */}
          <View style={styles.section}>
            <Image
              source={{ uri: `${baseUrl}${user.image}` }}
              style={styles.avatar}
            />

            <View>
              <Text style={typography.textLG_Medium}>{user.full_name}</Text>
              <Text style={typography.textBase_Regular}>
                {user.specialization}
              </Text>
            </View>
          </View>

          {/* Bottom */}
          <View style={styles.bottomItem}>
            <View style={styles.section}>
              <View style={styles.bottomIcon}>
                <Feather
                  name="user-plus"
                  size={20}
                  color={theme.colors["purple-600"]}
                />
              </View>

              <View>
                <Text style={typography.textLG_Medium}>
                  {user.patient_count}
                </Text>
                <Text style={typography.textBase_Regular}>Patients</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.bottomIcon}>
                <MaterialCommunityIcons
                  name="clipboard-list-outline"
                  size={20}
                  color={theme.colors["purple-600"]}
                />
              </View>

              <View>
                <Text style={typography.textLG_Medium}>
                  {user.work_experience} year(s)
                </Text>
                <Text style={typography.textBase_Regular}>Work Experience</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Mid card */}
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            justifyContent: "space-between",
            alignItems: "stretch",
            width: "100%",
            flexWrap: "wrap",
          }}>
          <View style={{ flex: 1 }}>
            <Text style={[typography.textBase_Regular]}>Gender</Text>
            <Text style={[typography.textSmall_Regular, styles.input]}>
              {user.gender}
            </Text>
          </View>
          <View style={{ flex: 1.5 }}>
            <Text style={[typography.textBase_Regular]}>Date of birth</Text>
            <Text style={[typography.textSmall_Regular, styles.input]}>
              {user.date_of_birth}
            </Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={[typography.textBase_Regular]}>Phone number</Text>
            <Text style={[typography.textSmall_Regular, styles.input]}>
              {user.phone_number}
            </Text>
          </View>
        </View>

        {/* Biograpgy */}
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            justifyContent: "space-between",
          }}>
          <View style={{ width: "100%" }}>
            <Text style={[typography.textBase_Regular]}>Biography</Text>
            <TextInput
              style={[typography.textBase_Regular, styles.textarea]}
              multiline
              readOnly>
              {user.biography}
            </TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.whatsappButton} onPress={() => {
                      const url = `https://wa.me/${user.api_number}`; // Replace with your WhatsApp link
                      Linking.openURL(url);
                    }}>
          <View style={styles.whatsappButtonLeft}>
            <View>
              <Image
                source={require("@/assets/images/whatsapp.png")}
                style={{
                  width: 16,
                  height: 16,
                }}
              />
            </View>
            <Text>WhatsApp Assistant</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={formStyles.submitButton}
          onPress={() => navigation.navigate("../analytics")}>
          <Text style={formStyles.submitText}>View Analytics</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ViewProfileScreen;

// stylesheet
const styles = StyleSheet.create({
  container: {
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

  input: {
    backgroundColor: theme.colors["purple-50"],
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: theme.rounded.medium,
    marginTop: 8,
  },
  textarea: {
    backgroundColor: theme.colors["purple-50"],
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: theme.rounded.medium,
    marginTop: 8,
    width: "100%",
    flexWrap: "wrap",
    textAlignVertical: "top",
    lineHeight: 22,
    height: 150,
  },
  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    borderWidth: 1,
    borderColor: theme.colors["purple-200"],
    borderRadius: 10,
    padding: 16,
    width: "100%",
  },
  whatsappButtonLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
});
