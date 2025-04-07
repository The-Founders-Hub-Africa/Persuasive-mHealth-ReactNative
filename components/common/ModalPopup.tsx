import {
  View,
  Text,
  TouchableOpacity,
  Modal as ModalComponent,
  Image,
} from "react-native";
import React from "react";
import modalStyles from "@/styles/modalStyles";

const ModalPopup = ({
  title,
  message,
  showModal,
  setShowModal,
  onPress,
}: {
  title: string;
  message: string;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  onPress: () => void;
}) => {
  return (
    <View>
      <ModalComponent
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <View style={modalStyles.modalCntr}>
          <View style={modalStyles.modalContent}>
            <Image
              source={require("@/assets/images/success-icon.png")}
              style={modalStyles.modalImage}
            />
            <View style={modalStyles.modalDescription}>
              <Text style={modalStyles.modalTitle}>{title}</Text>
              <Text style={modalStyles.modalText}>{message}</Text>
            </View>
            <TouchableOpacity onPress={onPress} style={modalStyles.modalButton}>
              <Text style={modalStyles.modalButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalComponent>
    </View>
  );
};

export default ModalPopup;
