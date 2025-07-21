import theme from '@/styles/theme';
import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function AppointmentsLayout() {
      const navigation = useRouter();

   return  (
        <Stack screenOptions={{ headerShown: true }} >
        <Stack.Screen name="index"  options={{ title: 'Appointments',
            headerRight: () => (
                <Pressable onPressIn={() => navigation.navigate("/appointments/newAppointments")}>
                  <Feather
                    name="plus"
                    size={24}
                    color={theme.colors["neutral-700"]}
                  />
                </Pressable>
                     ),

         }}/>
        <Stack.Screen name="editAppointment" 
        
        options={({
            route,
          }: {
            route: { params?: { name?: string } };
          }) => ({
            title: route.params?.name
              ? `Appointment with ${route.params.name}`
              : 'Edit Appointment' ,
          })}
          
        />
        <Stack.Screen name="newAppointments" options={{ title: 'New Appointment' }} />
        <Stack.Screen name="appointmentDetails" 
          options={({
            route,
          }: {
            route: { params?: { name?: string } };
          }) => ({
            title: route.params?.name
              ? `Appointment with ${route.params.name}`
              : 'Edit Appointment' ,
          })}
         />
        </Stack>
    )}
