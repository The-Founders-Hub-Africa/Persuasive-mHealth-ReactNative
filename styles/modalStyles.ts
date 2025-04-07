import { StyleSheet } from "react-native";
import theme from "./theme";

const modalStyles = StyleSheet.create({
  // modalBackdrop: {
  //   flex: 1,
  //   backgroundColor: "rgba(0,0,0,0.5)",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  modalCntr: {
    // width: "90%",
    // maxHeight: "80%",
    // backgroundColor: "white",
    // borderRadius: 10,
    // padding: 20,
    // alignSelf: "center",
    flex: 1,
    backgroundColor: theme.colors["black/50"],
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  modalContent: {
    width: "100%",
    margin: 60,
    backgroundColor: theme.colors.white,
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    gap: 20,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 80,
    height: 80,
  },
  modalDescription: {
    alignItems: "center",
    gap: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors["neutral-700"],
  },
  modalText: {
    fontSize: 16,
    color: theme.colors["neutral-700"],
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: theme.colors["purple-700"],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 600,
  },
});

export default modalStyles;
