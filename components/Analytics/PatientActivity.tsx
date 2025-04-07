import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import SectionHeader from "../common/SectionHeader";
import { BarChart } from "react-native-gifted-charts";
import theme from "@/styles/theme";
import typography from "@/styles/typography";
import { useAppSelector } from "@/integrations/hooks";
import { useRouter } from "expo-router";

const PatientActivity = ({ hideViewAll }: { hideViewAll?: boolean }) => {
  const navigation = useRouter();

  const appointmentsData = useAppSelector(state => state.appointments.data);

  const [barData, setBarData] = useState<
    Array<{
      value: number;
      label: string;
      spacing?: number;
      labelWidth?: number;
      labelTextStyle?: { color: string };
      frontColor: string;
    }>
  >([]);
  let onlineSample = {
    value: 40,
    label: "Jan",
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: { color: "gray" },
    frontColor: theme.colors["purple-700"],
  };
  let offlineSample = { value: 20, frontColor: theme.colors["neutral-300"] };

  useEffect(() => {
    let data: { [key: string]: any } = {};
    let fData = [];

    appointmentsData.forEach(appoint => {
      let type = appoint.mode;
      let month = appoint.date.split("/")[1];
      if (data[month]) {
        data[month][type] += 1;
      } else {
        data[month] = {
          online: 0,
          offline: 0,
        };
        data[month][type] += 1;
      }
    });

    for (const key in data) {
      fData.push({ ...onlineSample, value: data[key]["online"], label: key });
      fData.push({ ...offlineSample, value: data[key]["offline"], label: key });
    }

    setBarData(fData);
  }, [appointmentsData]);

  const renderTitle = () => {
    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 20,
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 6,
                backgroundColor: theme.colors["purple-700"],
                marginRight: 8,
              }}
            />
            <Text
              style={[
                typography.textSmall_Regular,
                {
                  width: "auto",
                },
              ]}>
              Online Meetings
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 6,
                backgroundColor: theme.colors["slate-300"],
                marginRight: 8,
              }}
            />
            <Text
              style={[
                typography.textSmall_Regular,
                {
                  width: "auto",
                },
              ]}>
              Offline Meetings
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return barData.length > 0 ? (
    <View
      style={{
        gap: 16,
        width: "100%",
      }}>
      <SectionHeader
        title="Patient Activity"
        onPress={() => navigation.navigate("/analytics")}
        hideViewAll={hideViewAll}
      />
      {renderTitle()}
      <BarChart
        data={barData}
        barWidth={8}
        spacing={24}
        roundedTop
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: "gray" }}
        noOfSections={4}
      />
    </View>
  ) : (
    <></>
  );
};

export default PatientActivity;
