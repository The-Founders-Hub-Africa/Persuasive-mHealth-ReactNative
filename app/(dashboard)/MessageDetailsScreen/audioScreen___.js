import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TrackPlayer, { usePlaybackState, State } from 'react-native-track-player';


// const service_function = async ()  => {
    // This service needs to be registered for the module to work
    // but it will be used later in the "Receiving Events" section
// }





const AudioPlayer = ({ audioSource }) => {
    const playbackState = usePlaybackState();
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        setupPlayer();
        return () => {
            TrackPlayer.destroy();
        };
    }, []);

    const setupPlayer = async () => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add({
            id: '1',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            title: 'Sample Audio',
            artist: 'SoundHelix',
            artwork: 'https://via.placeholder.com/150',
        });
    };

    const togglePlayback = async () => {
        if (playbackState === State.Playing) {
            await TrackPlayer.pause();
            setIsPlaying(false);
        } else {
            await TrackPlayer.play();
            setIsPlaying(true);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Audio Player</Text>
            <Button
                title={isPlaying ? 'Pause' : 'Play'}
                onPress={togglePlayback}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default AudioPlayer;