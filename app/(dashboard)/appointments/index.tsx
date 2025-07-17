import { ScrollView, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "@/styles/global";
import Tabs from "@/components/common/Tabs";
import SearchInput from "@/components/common/SearchInput";
// import { appointmentsData } from "@/src/helpers";
import { AppointmentProps } from "@/types";
import { useAppointmentsMutation } from "@/integrations/features/apis/apiSlice";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { addAlert } from "@/integrations/features/alert/alertSlice";
import { addAppointments } from "@/integrations/features/appointment/appointmentsSlice";
import AppointmentCard from "@/components/common/AppointmentCard";
import { convertDate, search_name } from "@/integrations/axios_store";
import { useRouter } from "expo-router";
// import { getPatientById } from "@/src/integrations/features/patient/patientsSlice";

const AppointmentsScreen = () => {
  const [search, setSearch] = useState("");
  const [hSearch, setHSearch] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const appointmentsData = useAppSelector(state => state.appointments.data);
  const patientsData = useAppSelector(state => state.patients.data);
  const [appointmentApi, { isLoading }] = useAppointmentsMutation();

  // const getPatientById = (patientsData:AppointmentProps, id:number) => patientsData.filter(patient:AppointmentProps => patient.id === id);

    const navigation  = useRouter()
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
  
      if(user){
        setLoading(false);
      }
  
      if(!user.logedin && !loading){
          navigation.replace("/login");
        }
  
        if(user.logedin && user.full_name == 'Not Set' && !loading){
          navigation.replace("/profileSetup");
        }
        if(user.logedin && !user.verified_number && !loading){
          navigation.replace("/OTPVerification");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user,loading])

  useEffect(() => {
    let data = {
      data: { action: "get_all", data: {} },
      token: user.usertoken,
    };
    appointmentApi(data).then(data => {
      if (data.error) {
        dispatch(addAlert({ ...data.error, page: "appointment page" }));
      }

      if (data.data) {
        dispatch(addAppointments({ data: data.data, save: true }));
      }
    });
  }, []);
  


const [state, setState] = useState<{
    history: AppointmentProps[];
    ongoing: AppointmentProps[];
}>({
    history: [],
    ongoing: [],
});
    
let historyAppointments: AppointmentProps[] = [];
let ongoingAppointments: AppointmentProps[] = []

  useEffect(() => { 
  ongoingAppointments = appointmentsData
  .filter(appointment => appointment.status === "pending")
  .sort(
    (a, b) =>
      new Date(convertDate(b.date)).getTime() -
      new Date(convertDate(a.date)).getTime()
  );

// Filter for history appointments (completed or cancelled)
const historyAppointments = appointmentsData
  .filter(
    appointment =>
      appointment.status === "completed" || appointment.status === "cancelled"
  )
  .sort(
    (a, b) =>
      new Date(convertDate(b.date)).getTime() -
      new Date(convertDate(a.date)).getTime()
  );

  setState({
    history: historyAppointments,
    ongoing: ongoingAppointments,
    });
  

  }, [appointmentsData]);


  useEffect(() => {
    if (search) {
      const filtered = ongoingAppointments.filter(elem =>
        search_name(elem.patient_name, search)
      );
      setState({ ...state, ongoing: filtered });
    } else {
      setState({ ...state, ongoing: ongoingAppointments });
    }
  }, [search]);

  useEffect(() => {
    if (hSearch) {
      const filtered = historyAppointments.filter(elem =>
        search_name(elem.patient_name, hSearch)
      );
      setState({ ...state, history: filtered });
    } else {
      setState({ ...state, history: historyAppointments });
    }
  }, [hSearch]);

  const tabs = [
    {
      title: "Ongoing",
      component: (
        <View>
          <SearchInput
            value={search}
            setValue={setSearch}
            placeholder="Search patient name"
          />
          <View
            style={{
              marginTop: 16,
            }}>
            <AppointmentsList appointmentsData={state.ongoing} />
          </View>
        </View>
      ),
    },
    {
      title: "History",
      component: (
        <View>
          <SearchInput
            value={hSearch}
            setValue={setHSearch}
            placeholder="Search"
          />
          <View
            style={{
              marginTop: 16,
            }}>
            <AppointmentsList appointmentsData={state.history} />
          </View>
        </View>
      ),
    },
  ];

  return (
    <ScrollView>
      <View style={globalStyles.dashboardContainer}>
        <Tabs tabs={tabs} />
      </View>
    </ScrollView>
  );
};

export default AppointmentsScreen;

const AppointmentsList = ({
  appointmentsData,
}: {
  appointmentsData: AppointmentProps[];
}) => {
  return (
    <View
      style={{
        gap: 4,
        width: "100%",
      }}>
      {appointmentsData.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 32 }}>
          <Text style={{ color: "#888" }}>No appointments to show yet.</Text>
        </View>
      ) : (
        appointmentsData.map(appointment => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            appointmentPage={true}
          />
        ))
      )}
    </View>
  );
};
