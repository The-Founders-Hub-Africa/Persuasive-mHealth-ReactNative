import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
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

        }}
      />

       <Tabs.Screen name='appointments/index'
      options={{
          title: 'Appointments',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="calendar-outline" color={color} />,

        }}
      />

       <Tabs.Screen name='messages/index'
      options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="chatbubble-outline" color={color} />,

        }}
      />


       <Tabs.Screen name='settings/index'
      options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="settings-outline" color={color} />,

        }}
      />
     
    </Tabs>
  );
}
