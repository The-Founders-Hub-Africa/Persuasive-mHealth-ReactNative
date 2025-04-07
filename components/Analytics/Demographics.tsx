import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import typography from "@/styles/typography";
import theme from "@/styles/theme";
import { useAppSelector } from "@/integrations/hooks";
import { getPatientAgeGroups } from "@/integrations/axios_store";

const Demographics = () => {

  const user = useAppSelector(state => state.user);
  const patients = useAppSelector(state => state.patients.data);
  const today = new Date().toISOString().split("T")[0];

  const [ageGroups, setAgeGroup] = useState({ childrenCount: 0, teenageCount: 0, adultCount: 0 });

  useEffect(() => {
    const { childrenCount, teenageCount, adultCount } = getPatientAgeGroups(patients);
    setAgeGroup({ childrenCount, teenageCount, adultCount });
  }, [patients]);

  return (
    <View>
      <Text style={style.title}>Patient Demographics</Text>

      <View style={style.container}>
        <View style={style.demographics}>
          <Text
            style={[
              typography.textBase_Regular,
              {
                width: "auto",
                paddingLeft: 8,
              },
            ]}>
            Patients
          </Text>
          <Text
            style={[
              typography.textBase_Regular,
              {
                width: "auto",
              },
            ]}>
            {new Date(today).toLocaleDateString("en-GB")}
          </Text>
        </View>

        <View style={style.demographics}>
          <Text
            style={[
              style.left,
              {
                borderLeftColor: theme.colors["purple-700"],
              },
            ]}>
            Total No of Patients
          </Text>
          <Text style={style.right}>{user.patient_count}</Text>
        </View>

        <View style={style.demographics}>
          <Text
            style={[
              style.left,
              {
                borderLeftColor: theme.colors["green-600"],
              },
            ]}>
            Total No of Female Patients
          </Text>
          <Text style={style.right}>{user.female_count}</Text>
        </View>

        <View style={style.demographics}>
          <Text
            style={[
              style.left,
              {
                borderLeftColor: theme.colors["yellow-500"],
              },
            ]}>
            Total No of Male Patients
          </Text>
          <Text style={style.right}>{ user.male_count}</Text>
        </View>

        <View style={style.demographics}>
          <Text
            style={[
              style.left,
              {
                borderLeftColor: theme.colors["pink-600"],
              },
            ]}>
            Total No of Children
          </Text>
          <Text style={style.right}>{ageGroups.childrenCount}</Text>
        </View>

        <View style={style.demographics}>
          <Text
            style={[
              style.left,
              {
                borderLeftColor: theme.colors["pink-600"],
              },
            ]}>
            Total No of Teenagers
          </Text>
          <Text style={style.right}>{ ageGroups.teenageCount}</Text>
        </View>

        <View style={style.demographics}>
          <Text
            style={[
              style.left,
              {
                borderLeftColor: theme.colors["orange-500"],
              },
            ]}>
            Total No of Adults
          </Text>
          <Text style={style.right}>{ageGroups.adultCount }</Text>
        </View>
      </View>
    </View>
  );
};

export default Demographics;

const style = StyleSheet.create({
  title: {
    marginBottom: 16,
    ...typography.textLG_Medium,
  },
  container: {
    backgroundColor: theme.colors["purple-50"],
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderRadius: theme.rounded.medium,
    gap: 16,
    width: "100%",
  },
  demographics: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    width: "100%",
    paddingRight: 8,
  },
  left: {
    ...typography.textSmall_Regular,
    width: "auto",
    borderLeftWidth: 8,
    paddingLeft: 8,
  },
  right: {
    ...typography.textSmall_Regular,
    width: "auto",
  },
});


