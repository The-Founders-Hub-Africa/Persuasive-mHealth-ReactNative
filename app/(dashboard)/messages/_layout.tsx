import theme from '@/styles/theme';
import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export default function MessagesLayout() {
      const navigation = useRouter();
    const [canSearch, setCanSearch] = useState(false);

   return  (
        <Stack screenOptions={{ headerShown: true }} >
        <Stack.Screen name="index"  options={{ title: 'Messages',
            headerRight: () => (
            <TouchableOpacity onPress={() => setCanSearch(prev => !prev)}>
              {/* ⬆️ Toggle search input visibility */}
              <Feather
                name="search"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            </TouchableOpacity>
          )

         }}/>
        <Stack.Screen
          name="messageDetails"
         
        />
        </Stack>
    )}
