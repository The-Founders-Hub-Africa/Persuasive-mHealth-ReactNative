import { useEffect, useState } from 'react';
import { View, StyleSheet, Button,Text } from 'react-native';
import { Audio } from 'expo-av';
import { formatTime } from '@/integrations/axios_store'



export default function AudioScreen({ audioSource }) {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [didJustFinish, setDidJustFinish] = useState(false);
  // audioSource = 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3' 

  const setProgressBar = (event,progress,isPlaying) => {
          const { locationX } = event.nativeEvent;
          const progressBarWidth = event.target.clientWidth;

          const clickedPercentage = locationX / progressBarWidth;
    const clickedPosition = clickedPercentage * progress.durationMillis;
    if (isPlaying) {
      setLoading(true);
      sound.setPositionAsync(clickedPosition);
    } else {
      setLoading(true);
      sound.playFromPositionAsync(clickedPosition);
    }
        }

 
  const [progress, setProgress] = useState({
    position: '0:00',
    duration: '0:00', progress: 0,
    durationMillis: 0
  });

useEffect(() => {
  let interval;
  if (sound && sound._loaded) {
    interval = setInterval(async () => {
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        
        setProgress({
          position: formatTime(status.positionMillis),
          duration: formatTime(status.durationMillis),
          progress: status.positionMillis / status.durationMillis,
          durationMillis: status.durationMillis
        });
      }

      if (status.durationMillis === status.positionMillis) {
        setIsPlaying(false);
        setDidJustFinish(true);
        setProgress({
          position: formatTime(status.positionMillis),
          duration: formatTime(status.durationMillis),
          progress: status.positionMillis / status.durationMillis,
          durationMillis: status.durationMillis
        });
        
      }
      if (status.isPlaying && isPlaying === false) {
        setIsPlaying(true);
        setLoading(false);
      }
      if (status.isPlaying && loading === true) {
        setLoading(false);
      }
    }, 500);
  }
  return () => clearInterval(interval);
}, [sound]);
  
  

  const ProgressBar = ({ progress }) => (
  <View>
  <View>
      <Text style={[{ marginRight: 20 }]}>
        {progress.position} / {progress.duration}
      </Text>
      </View>
      <View style={styles.progressBarContainer}
       onStartShouldSetResponder={() => true}
        onResponderRelease={(event) => setProgressBar(event,progress,isPlaying)}
      >
    {/* <Text>{Math.round(progress.progress * 100)}%</Text> */}
        <View style={[styles.progressBar, { width: `${progress.progress * 100}%`, backgroundColor: 'green' }]}   
        />
      
      </View>
    </View>
  );
  


  async function playSound() {
   
    if (sound) {
    setLoading(true);
    const status = await sound.getStatusAsync();
    if (status.isPlaying) {
      setLoading(false);
      await sound.pauseAsync();
      setIsPlaying(false);
    } else if (!didJustFinish) {
     
      await sound.playAsync();
      setIsPlaying(true);
    }else{
      setLoading(true);
      await sound.replayAsync();
      setDidJustFinish(false);
    }
  } else {
    setLoading(true);
    setIsPlaying(false);
    const { sound: newSound } = await Audio.Sound.createAsync(
    { uri: audioSource }
    );
    setSound(newSound);
    await newSound.playAsync();
    setIsPlaying(true);
    // setLoading(false);
  }
  
  }



  async function preLoad() {
  const { sound } = await Audio.Sound.createAsync( 
        {uri: audioSource}
    );

    setSound(sound);

    await sound.playAsync()
    await sound.stopAsync()
    
    
    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      setProgress({
        position: formatTime(status.positionMillis),
        duration: formatTime(status.durationMillis),
        progress: status.positionMillis / status.durationMillis,
        durationMillis: status.durationMillis
      });
    }

  }
  
 
  useEffect(() => {
   if (!sound) {
     preLoad();
  }
  }, [])
 
      
  useEffect(() => {
    return sound
      ? () => {
           sound.unloadAsync(); 
        }
      : undefined;
  }, [sound]);
    
  useEffect(() => {
  }, [isPlaying]);

  return (
      <View style={styles.container}>
          {/* <Button title="Play Sound" onPress={playSound} /> */}
          {/* sound != undefined && sound._loaded */}
         
      {sound && sound._loaded  ?
        <>
          <ProgressBar progress={progress} />
         
          <Button title={isPlaying ? 'Pause' : 'Play'}
            onPress={playSound}
            disabled={loading}
          /> 
            
          </>
        : <Text>Audio Loading...</Text>} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  progressBarContainer: {
      height: 20,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      backgroundColor: '#e0e0e0',
      borderRadius: 10,
      overflow: 'hidden',
    },
  progressBar: {
      // flex: 1,
      height: '100%',
      borderRadius: 10,
    },
});
