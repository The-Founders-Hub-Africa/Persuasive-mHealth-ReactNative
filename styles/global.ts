import { StyleSheet } from "react-native";
import theme from "./theme";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 28,
    paddingVertical: 20,
    minHeight: "100%",
    backgroundColor: theme.colors.white,
  },
  dashboardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingBottom: 150,
    minHeight: "100%",
    backgroundColor: theme.colors.white,
  },

  // for the search input
  searchInputCntr: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors["purple-400"],
  },
  searchIconCntr: {
    padding: 16,
    borderColor: "#E5E7EB",
  },
  searchInput: {
    padding: 16,
    flex: 1,
    color: "#333",
  },

  // for input error text
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },

  // images
  logoRect: {
    width: 40,
    height: 50,
    marginBottom: 16,
    alignSelf: "center",
  },

  squareImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
    alignSelf: "center",
  },

  // for the three dots dropdown
  actionsBtn: {
    zIndex: 5,
    elevation: 5,
  },
  actionsDropdown: {
    position: "absolute",
    right: 25,
    top: -2,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    zIndex: 5,
    elevation: 5,
    minWidth: 150,
  },
});

export default globalStyles;
