import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useRouter } from 'expo-router';
import { Feather, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';
import theme from '@/styles/theme';
import { useState } from 'react';


export default function TabLayout() {

  const navigation = useRouter();
   const [canSearch, setCanSearch] = useState(false);

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }} backBehavior='order'>
      <Tabs.Screen name='home/index'
      options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home-outline" color={color} />,

        }}
      />

       <Tabs.Screen name='patients/index'
          options={{
          title: 'Patients',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="people-outline" color={color} />,
          headerRight: () => (
            <TouchableOpacity onPress={()=>navigation.navigate("../newPatient")}>
              <Feather
                name="plus"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            </TouchableOpacity>
          ),
        }}
      />

       <Tabs.Screen name='appointments/index'
      options={{
          title: 'Appointments',
          headerRight: () => (
            <TouchableOpacity onPress={()=>navigation.navigate("../newAppointments")}>
              <Feather
                name="plus"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => <Ionicons size={28} name="calendar-outline" color={color} />,

        }}
      />

       <Tabs.Screen name='messages/index'
      options={{
          title: 'Messages',
            headerRight: () => (
            <TouchableOpacity onPress={() => setCanSearch(prev => !prev)}>
              {/* ⬆️ Toggle search input visibility */}
              <Feather
                name="search"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => <Ionicons size={28} name="chatbubble-outline" color={color} />,

        }}
      />


       <Tabs.Screen name='settings'
        options={{
          title: 'Settings',
          popToTopOnBlur:true,
          tabBarIcon: ({ color }) => <Ionicons size={28} name="settings-outline" color={color} />,

        }}
      /> 
     
    </Tabs>
  );
}
