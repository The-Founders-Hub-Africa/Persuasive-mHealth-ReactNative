import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button,Text } from 'react-native';
import { useEffect, useState } from 'react';

export default function VideoScreen({ videoSource }) {

  const [loading, setLoading] = useState(true);
  const player = useVideoPlayer(videoSource);

  const { status, error } = useEvent(player, 'statusChange', { status: player.status });

  useEffect(() => {
   if (status === 'readyToPlay') {
    setLoading(false);
   }
  }, [status])


  return (
    <View style={styles.contentContainer}>
      {loading ? <Text>Loading Video ...</Text> : 
      <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
      }
      
      <View style={styles.controlsContainer}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
