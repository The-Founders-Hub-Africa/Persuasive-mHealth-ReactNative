import { StyleSheet } from "react-native";
import theme from "./theme";

const typography = StyleSheet.create({
  text2XL_SemiBold: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 29,
    color: theme.colors["neutral-700"],
    width: "100%",
  },
  textXL_SemiBold: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 24,
    color: theme.colors["neutral-700"],
    width: "100%",
  },
  textXL_Medium: {
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 24,
    color: theme.colors["neutral-700"],
    width: "100%",
  },
  textLG_Medium: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 21,
    color: theme.colors["neutral-700"],
    width: "100%",
  },
  textBase_Medium: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 24,
    color: theme.colors["neutral-500"],
    width: "100%",
  },
  textBase_Regular: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
    color: theme.colors["neutral-500"],
    width: "100%",
  },
  textSmall_Medium: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 20,
    color: theme.colors["neutral-700"],
    width: "100%",
  },
  textSmall_Regular: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20,
    color: theme.colors["neutral-700"],
    width: "100%",
  },
  textSmall_Light: {
    fontSize: 14,
    fontWeight: 300,
    lineHeight: 20,
    color: theme.colors["neutral-700"],
    width: "100%",
  },
  textXS_SemiBold: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 16,
    color: theme.colors["neutral-700"],
    width: "100%",
  },
  textXS_Regular: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16,
    color: theme.colors["neutral-700"],
    width: "100%",
  },
  textXS_Light: {
    fontSize: 12,
    fontWeight: 300,
    lineHeight: 16,
    color: theme.colors["neutral-700"],
    width: "100%",
  },
});

export default typography;
