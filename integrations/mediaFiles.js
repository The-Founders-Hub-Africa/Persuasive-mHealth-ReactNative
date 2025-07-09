import * as FileSystem from 'expo-file-system';
import { axiosGetMediaFile } from './axios_store';
import {baseUrl} from './features/apis/apiSlice'


  // Save image to file system
const saveImageToFileSystem = async (blob, filename) => {
      const base64Data = await blobToBase64(blob);
      
      const fileUri = `${FileSystem.documentDirectory}${filename}`;
      
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
    };

const blobToBase64 = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
};
     



export const getMediaFiles = async (data, video_state, set_video,
                                audio_state, set_audio,
                                image_state, set_image) => {
                                                            
    let setters = {
        video: [set_video, video_state],
        audio: [set_audio, audio_state],
        image: [set_image, image_state]
    }
  
  data.forEach(async message => {
      if (message.record_type !== 'text') {
        let source = message[message.record_type]

        setters[message.record_type][0](prevState => ({
                    ...prevState,
                    [message.id]: source
              }))
      }
    });
}
