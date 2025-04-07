import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { PatientProps } from "@/types";
import theme from "@/styles/theme";
import typography from "@/styles/typography";

const PersonalData = ({ patient }: { patient: PatientProps }) => {
  return (
    <View style={styles.container}>
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
          <Text style={[typography.textBase_Regular]}>Date of birth</Text>
          <Text style={[typography.textSmall_Regular, styles.input]}>
            {patient.date_of_birth}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[typography.textBase_Regular]}>Gender</Text>
          <Text style={[typography.textSmall_Regular, styles.input]}>
            {patient.gender}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[typography.textBase_Regular]}>Genotype</Text>
          <Text style={[typography.textSmall_Regular, styles.input]}>
            {patient.genotype}
          </Text>
        </View>
      </View>

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
          <Text style={[typography.textBase_Regular]}>Next of kin</Text>
          <Text style={[typography.textSmall_Regular, styles.input]}>
            {patient.next_of_kin}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[typography.textBase_Regular]}>Kin number</Text>
          <Text style={[typography.textSmall_Regular, styles.input]}>
            {patient.kin_number}
          </Text>
        </View>
      </View>

      {/* About */}
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          justifyContent: "space-between",
        }}>
        <View style={{ width: "100%" }}>
          <Text style={[typography.textBase_Regular]}>About</Text>
          <TextInput
            style={[
              typography.textBase_Regular,
              styles.textarea,
              { height: 150 },
            ]}
            multiline
            readOnly>
            {patient.about}
          </TextInput>
        </View>
      </View>

      {/* Symptoms */}
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          justifyContent: "space-between",
        }}>
        <View style={{ width: "100%" }}>
          <Text style={[typography.textBase_Regular]}>Symptoms</Text>
          <TextInput
            style={[
              typography.textBase_Regular,
              styles.textarea,
              { height: 100 },
            ]}
            multiline
            readOnly>
            {patient.symptoms}
          </TextInput>
        </View>
      </View>
    </View>
  );
};

export default PersonalData;

// stylesheet
const styles = StyleSheet.create({
  container: {
    gap: 24,
    width: "100%",
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
  },
});
