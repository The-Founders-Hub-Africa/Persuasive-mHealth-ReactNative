import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "@/styles/global";
import Greetings from "@/components/home/Greetings";
import SearchCard from "@/components/home/SearchCard";
import PatientActivity from "@/components/Analytics/PatientActivity";
import AppointmentCalendar from "@/components/home/AppointmentCalendar";
import RecentAppointments from "@/components/home/RecentAppointments";
import RecentPatients from "@/components/home/RecentPatients";
// import { patientsData, appointmentsData } from "@/src/helpers";
// import Alert_System from "@/src/integrations/features/alert/Alert";
import {  useAppointmentsMutation, usePatientMutation } from "@/integrations/features/apis/apiSlice";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { addAlert } from "@/integrations/features/alert/alertSlice";
import { addPatients } from '@/integrations/features/patient/patientsSlice'
import { addAppointments } from "@/integrations/features/appointment/appointmentsSlice";
import { useRouter } from "expo-router";



const HomeScreen = () => {

  const dispatch = useAppDispatch();
  const navigation = useRouter();
   const user = useAppSelector(state => state.user);
  const patients = useAppSelector(state => state.patients.data);
  const appointment = useAppSelector(state => state.appointments.data);
  const [patientsApi, { isLoading }] = usePatientMutation();
  const [appointmentApi, { isLoading:isloading }] = useAppointmentsMutation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if(!user.logedin && !loading){
        console.log('user not logged in reporting from home screen')
        navigation.navigate("/login");
      }

      if(user.logedin && user.full_name == 'Not Set' && !loading){
        navigation.navigate("/profileSetup");
      }
      if(user.logedin && !user.verified_number && !loading){
        navigation.navigate("/OTPVerification");
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user,loading])

    useEffect(() => {

        if(user){
      setLoading(false);
    }

      if(user.logedin){
        let data = {
          data: { action: 'get_all', data:{} },
          token: user.usertoken
        }


      patientsApi(data).then(data => {
        if (data.error) {
          dispatch(addAlert({ ...data.error, page: "home_screen" }))
      }
        
        if (data.data) {
          dispatch(addPatients({ data: data.data,save:true }))
        }
      })
    }
    
    }, [user])
  

   useEffect(() => {
            let data = {
              data: { action: 'get_all', data:{} },
              token: user.usertoken
            }
            if (user.logedin){
            console.log(data.token)
          appointmentApi(data).then(data => {
            if (data.error) {
              dispatch(addAlert({ ...data.error, page: "Home_Screen" }))
          }
            
            if (data.data) {
              dispatch(addAppointments({ data: data.data,save:true }))
            }
          })
        }
        
   }, [user])
  
  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        {/* <Alert_System/> */}
        <Greetings />
        <SearchCard />

        <View
          style={{
            gap: 24,
            width: "100%",
          }}>
          <PatientActivity />
          <AppointmentCalendar />
          <RecentAppointments appointmentsData={appointment} />
          <RecentPatients patientsData={patients} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
