import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7E22CE",
  },

  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    borderRadius: 100,
  },

  welcomeTxt: {
    fontSize: 48,
  },

  health: {
    color: "#11B3CF",
  },

  tagline: {
    fontSize: 16,
  },
});

export default styles;
