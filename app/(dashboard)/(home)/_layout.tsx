import { Stack } from 'expo-router';

export default function HomeLayout() {

    return  (
        <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="analytics"  options={{ title: 'Analytics' }}/>
        <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
        <Stack.Screen name="search" options={{ title: 'Search' }} />
        <Stack.Screen name="viewProfile" options={{ title: 'View Profile' }} />
        </Stack>
    )}