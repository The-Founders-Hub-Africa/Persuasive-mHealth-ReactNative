import { Tabs } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";


export default function TabLayout() {

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue',headerShown:false,popToTopOnBlur:true }} backBehavior='order'>
      <Tabs.Screen name='(home)'
      options={{
          title: 'Home',
          popToTopOnBlur:true,
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home-outline" color={color} />,

        }}
      />

       <Tabs.Screen name='patients'
          options={{
          title: 'Patients',
          popToTopOnBlur:true,
          tabBarIcon: ({ color }) => <Ionicons size={28} name="people-outline" color={color} />
        }}
      />

       <Tabs.Screen name='appointments'
      options={{
          title: 'Appointments',
          popToTopOnBlur:true,
          tabBarIcon: ({ color }) => <Ionicons size={28} name="calendar-outline" color={color} />,

        }}
      />

       <Tabs.Screen name='messages'
      options={{
          title: 'Messages',
          popToTopOnBlur:true,
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
