import { StyleSheet } from "react-native";
import theme from "./theme";

const formStyles = StyleSheet.create({
  inputGroup: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.colors["neutral-700"],
    marginBottom: 10,
  },
  inputCntr: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: theme.colors["purple-400"],
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 12,
    width: "100%",
  },
  inputCntrDisabled: {
    borderColor: theme.colors["disabled-text"],
    backgroundColor: theme.colors["disabled-bg"],
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: theme.colors["neutral-700"],
  },
  inputTextDisabled: {
    color: theme.colors["disabled-text"],
  },

  // for form buttons
  buttonsCntr: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  submitButton: {
    backgroundColor: theme.colors["purple-700"],
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  submitText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 600,
  },

  // for the profile image upload
  profileImageCntr: {
    marginBottom: 24,
    width: 72,
    height: 72,
    borderRadius: theme.rounded.full,
    backgroundColor: theme.colors["disabled-bg"],
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors["purple-400"],
    overflow: "hidden",
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: theme.rounded.full,
    objectFit: "cover",
  },

  // for select gender input
  genderCntr: {
    flexDirection: "column",
  },
  genderOptionMale: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 55,
  },
  genderOptionFemale: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    height: 55,
  },
  genderText: {
    flex: 1,
    fontSize: 16,
    color: theme.colors["neutral-700"],
  },

  // for dropdown input
  inputDropdownCntr: {
    borderWidth: 1,
    borderColor: theme.colors["purple-400"],
    borderRadius: 8,
    width: "100%",
  },

  // for the date input
  inputDateCntr: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors["purple-400"],
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 12,
    width: "100%",
    height: 55,
  },

  // for the text under the form submit buttons
  infoGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  infoText: {
    color: theme.colors["neutral-500"],
    fontSize: 16,
  },
  infoLink: {
    color: theme.colors["purple-700"],
    fontSize: 16,
  },
});

export default formStyles;
