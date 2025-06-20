import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useRouter } from 'expo-router';
import { Feather, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';
import theme from '@/styles/theme';


export default function TabLayout() {

  const navigation = useRouter();
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
