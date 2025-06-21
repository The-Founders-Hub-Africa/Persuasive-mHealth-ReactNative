import { Stack } from 'expo-router';

export default function SettingsLayout() {
    return  (
            <Stack screenOptions={{ headerShown: true }} >
            <Stack.Screen name="index"  options={{ title: 'Settings' }}/>
            <Stack.Screen name="editProfile" options={{ title: 'Edit Profile' }} />
            <Stack.Screen name="faq" options={{ title: 'FAQ' }} />
            <Stack.Screen name="notificationSettings" options={{ title: 'Notification Settings' }} />
            <Stack.Screen name="oldPassword" options={{ title: 'Old Password' }} />
            <Stack.Screen name="privacyPolicy" options={{ title: 'Privacy & Policy' }} />
            <Stack.Screen name="resetPassword" options={{ title: 'Reset Password' }} />
            <Stack.Screen name="security" options={{ title: 'Account security' }} />
            <Stack.Screen name="support" options={{ title: 'Support & Legal' }} />
            <Stack.Screen name="terms" options={{ title: 'Terms & Conditions' }} />
            </Stack>
        )}
    
