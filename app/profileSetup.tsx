import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const  ProfileSetupScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            {/* Add your home screen content here */}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default ProfileSetupScreen;