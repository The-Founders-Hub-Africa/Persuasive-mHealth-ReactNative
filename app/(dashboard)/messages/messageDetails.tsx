import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
} from "react-native";
import globalStyles from "@/styles/global";
import theme from "@/styles/theme";
import typography from "@/styles/typography";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { useWhatsappRecordsMutation } from "@/integrations/features/apis/apiSlice";
import { get_id, get_name } from "@/integrations/axios_store";
import { addwhatsappMessage } from "@/integrations/features/whatsappMessages/whatsappMessageSlice";
import { addAlert } from "@/integrations/features/alert/alertSlice";
// import Alert_System from "@/integrations/features/alert/Alert";
import { getMediaFiles } from "@/integrations/mediaFiles";
import VideoScreen from "./videoScreen";
import AudioScreen from "./audioScreen";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router";
// import ImageViewer from "react-native-image-zoom-viewer";

const MessageDetailsScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const scale = new Animated.Value(1);

  // remember to uninstall expo-av expo-video-player react-native-sound-player react-native-video

  const [audio, setAudio] = useState<{ [key: number]: string }>({});
  const [image, setImage] = useState<{ [key: number]: string }>({});
  const [video, setVideo] = useState<{ [key: number]: string }>({});

  
  let id = 0
  let patientName = ''
    let {id:id_,name} = useLocalSearchParams<{id?:string,name?:string}>();
    if(id_ && name){
      id = parseInt(id_)
      patientName = name
      }

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const mgs = useAppSelector((state) => state.whatsappMessage);

  const [WhatsappMessage, { isLoading }] = useWhatsappRecordsMutation();

  useEffect(() => {

    let data = {
      data: { action: "get_patient_records", data: { patient_id: id } },
      token: user.usertoken,
    };
    if(user.logedin){
    WhatsappMessage(data).then((response) => {
      if (response.data) {
        dispatch(addwhatsappMessage(response.data));
        getMediaFiles(
          response.data,
          video,
          setVideo,
          audio,
          setAudio,
          image,
          setImage,
          user.usertoken
        );
      }
      if (response.error) {
        dispatch(addAlert({ ...response.error, page: "message_details" }));
      }
    });
  }
  }, [user]);


  useEffect(() => {
    const interval = setInterval(() => {
      let data = {
        data: { action: "get_patient_records", data: { patient_id: id } },
        token: user.usertoken,
      };
      WhatsappMessage(data).then((response) => {
        if (response.data) {
          let new_data = response.data.length !== mgs.data.length
          if(new_data){
          dispatch(addwhatsappMessage(response.data));
          getMediaFiles(
            response.data,
            video,
            setVideo,
            audio,
            setAudio,
            image,
            setImage,
            user.usertoken
          );
        }
        }
        if (response.error) {
          dispatch(addAlert({ ...response.error, page: "message_details" }));
        }
      });
    }, 1200000);

    return () => clearInterval(interval);
  }, []);


  const onPinchEvent = Animated.event([{ nativeEvent: { scale } }], {
    useNativeDriver: true,
  });

  const onPinchStateChange = (event: any) => {
    if (event.nativeEvent.scale === State.END) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  // const handleSaveToProfile = () => {
  //   Toast.show({ type: "success", text1: "Image saved to profile!" });
  //   setSelectedImage(null);
  // };

  return (
    <ScrollView>
      {/* <Alert_System /> */}
      <View style={globalStyles.dashboardContainer}>
        <View style={{ gap: 8, width: "100%" }}>
          {mgs.data &&
            mgs.data.map((message, index) => {
              switch (message.record_type) {
                case "text":
                  return (
                    <View
                      key={`text-${message.id}-${index}`}
                      style={[
                        styles.messageText,
                        {
                          backgroundColor:
                            message.context != "medical_practitioner"
                              ? theme.colors["neutral-200"]
                              : theme.colors["purple-50"],
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color:
                            message.context != "medical_practitioner"
                              ? theme.colors["neutral-700"]
                              : theme.colors["purple-700"],
                          textAlign:
                            message.context == "medical_practitioner"
                              ? "left"
                              : "right",
                        }}
                      >
                        {message.context != "medical_practitioner"
                          ? patientName
                          : user.full_name}
                      </Text>
                      <Text
                        style={{
                          color: theme.colors["neutral-500"],
                          marginBottom: 10,
                          textAlign:
                            message.context == "medical_practitioner"
                              ? "left"
                              : "right",
                        }}
                      >
                        {message.timestamp}
                      </Text>
                      <Text>{message.content}</Text>
                    </View>
                  );
                case "image":
                  return (
                    <View
                      key={`image-${message.id}-${index}`}
                      style={[
                        styles.messageText,
                        {
                          backgroundColor:
                            message.context != "medical_practitioner"
                              ? theme.colors["neutral-200"]
                              : theme.colors["purple-50"],
                        },
                      ]}
                    >
                      <Text
                        style={
                          message.context != "medical_practitioner"
                            ? {
                                color: theme.colors["neutral-700"],
                              }
                            : {
                                color: theme.colors["purple-700"],
                                textAlign: "right",
                              }
                        }
                      >
                        {message.context != "medical_practitioner"
                          ? patientName
                          : user.full_name}
                      </Text>
                      <Text
                        style={
                          message.context != "medical_practitioner"
                            ? {
                                color: theme.colors["neutral-600"],
                                marginBottom: 10,
                              }
                            : {
                                color: theme.colors["purple-700"],
                                textAlign: "right",
                                marginBottom: 10,
                              }
                        }
                      >
                        {message.timestamp}
                      </Text>
                      <TouchableOpacity
                        key={`image-touchable-${message.id}-${index}`}
                        onPress={() => setSelectedImage(image[message.id])}
                      >
                        <Image
                          source={{
                            uri: image[message.id],
                          }}
                          style={styles.image}
                        />
                      </TouchableOpacity>

                      <GestureHandlerRootView style={{ flex: 1 }}>
                        <Modal
                          visible={!!selectedImage}
                          transparent={true}
                          animationType="fade"
                          onRequestClose={() => setSelectedImage(null)}
                        >
                          <View style={styles.modalContainer}>
                            <TouchableOpacity
                              style={styles.closeButton}
                              onPress={() => setSelectedImage(null)}
                            >
                              <Text style={styles.closeText}>Close</Text>
                            </TouchableOpacity>

                            <PinchGestureHandler
                              onGestureEvent={onPinchEvent}
                              onHandlerStateChange={onPinchStateChange}
                            >
                              <Animated.Image
                                source={{ uri: selectedImage ? selectedImage : "" }}
                                style={[
                                  styles.fullScreenImage,
                                  { transform: [{ scale: 1 }] },
                                ]}
                                resizeMode="contain"
                              />
                            </PinchGestureHandler>
                          </View>
                        </Modal>
                      </GestureHandlerRootView>
                    </View>
                  );
                case "video":
                  return (
                    <View
                      key={`video-${message.id}-${index}`}
                      style={[
                        styles.messageText,
                        {
                          backgroundColor:
                            message.context != "medical_practitioner"
                              ? theme.colors["neutral-200"]
                              : theme.colors["purple-50"],
                        },
                      ]}
                    >
                      <Text
                        style={
                          message.context != "medical_practitioner"
                            ? {
                                color: theme.colors["neutral-700"],
                              }
                            : {
                                color: theme.colors["purple-700"],
                                textAlign: "right",
                              }
                        }
                      >
                        {message.context != "medical_practitioner"
                          ? patientName
                          : user.full_name}
                      </Text>
                      <Text
                        style={
                          message.context != "medical_practitioner"
                            ? {
                                color: theme.colors["neutral-600"],
                                marginBottom: 10,
                              }
                            : {
                                color: theme.colors["purple-700"],
                                textAlign: "right",
                                marginBottom: 10,
                              }
                        }
                      >
                        {message.timestamp}
                      </Text>
                      <Text>{video[message.id] ? null : "Loading Video"}</Text>
                      <View>
                        {video[message.id] ? (
                          <VideoScreen key={`video-screen-${message.id}-${index}`} videoSource={video[message.id]} />
                        ) : null}
                      </View>
                    </View>
                  );
                case "audio":
                  return (
                    <View
                      key={`audio-${message.id}-${index}`}
                      style={[
                        styles.messageText,
                        {
                          backgroundColor:
                            message.context != "medical_practitioner"
                              ? theme.colors["neutral-200"]
                              : theme.colors["purple-50"],
                        },
                      ]}
                    >
                      <Text
                        style={
                          message.context != "medical_practitioner"
                            ? {
                                color: theme.colors["neutral-700"],
                              }
                            : {
                                color: theme.colors["purple-700"],
                                textAlign: "right",
                              }
                        }
                      >
                        {message.context != "medical_practitioner"
                          ? patientName
                          : user.full_name}
                      </Text>
                      <Text
                        style={
                          message.context != "medical_practitioner"
                            ? {
                                color: theme.colors["neutral-600"],
                                marginBottom: 10,
                              }
                            : {
                                color: theme.colors["purple-700"],
                                textAlign: "right",
                                marginBottom: 10,
                              }
                        }
                      >
                        {message.timestamp}
                      </Text>
                      <Text>{audio[message.id] ? null : "Loading Audio"}</Text>
                      <View>
                        {audio[message.id] != undefined ? (
                          <AudioScreen key={`audio-screen-${message.id}-${index}`} audioSource={audio[message.id]} />
                        ) : null}
                      </View>
                    </View>
                  );
                default:
                  return null;
              }
            })}
        </View>

        {/* Modal for Expanded Image */}
        {/* <Modal visible={!!selectedImage} transparent animationType="fade">
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setSelectedImage(null)}
          >
            {selectedImage && (
              <View style={styles.modalContent}>
                <Image
                  source={require(`@/assets/images/avatar.png`)}
                  style={styles.expandedImage}
                />
              </View>
            )}
          </TouchableOpacity>
        </Modal> */}
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  messageText: {
    ...typography.textBase_Medium,
    backgroundColor: theme.colors["neutral-200"],
    padding: 20,
    borderRadius: 10,
  },
  imageGrid: {
    backgroundColor: theme.colors["neutral-200"],
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: theme.rounded.medium,
    backgroundColor: theme.colors["purple-100"],
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  expandedImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: theme.colors["purple-600"],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: theme.rounded.medium,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: "90%",
    height: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default MessageDetailsScreen;
