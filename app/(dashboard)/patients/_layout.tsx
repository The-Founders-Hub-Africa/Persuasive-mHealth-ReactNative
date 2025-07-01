import theme from '@/styles/theme';
import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function PatientsLayout() {
      const navigation = useRouter();

   return  (
        <Stack screenOptions={{ headerShown: true }} >
        <Stack.Screen name="index"  options={{ title: 'Patients',
            headerRight:() => (
            <TouchableOpacity onPress={()=>navigation.navigate("/patients/newPatient")}>
              <Feather
                name="plus"
                size={24}
                color={theme.colors["neutral-700"]}
              />
            </TouchableOpacity>
          ),

         }}/>
        <Stack.Screen name="editPatient" 
        options={({
            route,
          }: {
            route: { params?: { name?: string } };
          }) => ({
            title: route.params?.name
              ? `${route.params.name} Profile`
              : 'Edit Patient' ,
          })}
        />
        <Stack.Screen name="newPatient" options={{ title: 'New Patient' }} />
        <Stack.Screen name="patientDetails" 
        options={({
            route,
          }: {
            route: { params?: { name?: string } };
          }) => ({
            title: route.params?.name
              ? `${route.params.name} Profile`
              : 'Edit Patient' ,
          })}
        />
        </Stack>
    )}
