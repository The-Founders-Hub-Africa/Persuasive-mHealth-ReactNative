import { useEffect, useState } from 'react';
import { View, StyleSheet, Button,  TouchableOpacity } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Text } from 'react-native-svg';


export default function AudioScreen({ audioSource }) {

    console.log('audio source',audioSource)
    const player = useAudioPlayer('https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3');
    playerStatus = useAudioPlayerStatus(player)
    

    const handleAudio = () => {
        if (playerStatus.timeControlStatus =='paused') {
            player.play();  
        } else {
            player.pause();
        }
    };

    return (
        <View style={styles.container}>
            
            {/* <Button title= 'Back' onPress={handleBackward} /> */}
            <Button title={playerStatus.timeControlStatus =='paused' ? 'Play' : 'Pause'} onPress={handleAudio} />
            {/* <Button title= 'Forward' onPress={handleFastForward} /> */}
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
});