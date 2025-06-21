import { ScrollView, StyleSheet, View, Pressable, Text } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "@/styles/global";
import SearchInput from "@/components/common/SearchInput";
import theme from "@/styles/theme";
import PatientCard from "@/components/common/PatientList";
import AppointmentsList from "@/components/common/AppointmentsList";
import MessageList from "@/components/common/MessageList";
import PatientList from "@/components/common/PatientList";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { search_name } from "@/integrations/axios_store";
import { addAlert } from "@/integrations/features/alert/alertSlice";
import { addPatients } from "@/integrations/features/patient/patientsSlice";
import { useAppointmentsMutation, usePatientMutation } from "@/integrations/features/apis/apiSlice";
import { addAppointments } from "@/integrations/features/appointment/appointmentsSlice";
import { addPatientAndMessage } from "@/integrations/features/patient/patientAndMessageSlice";


const SearchScreen = () => {

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const patientAndMessages = useAppSelector(state => state.patientandmessage);
  const appointmentsData = useAppSelector(state => state.appointments.data);
  const patientsData = useAppSelector(state => state.patients.data);

  const [patientsApi, { isLoading }] = usePatientMutation();
  const [appointmentApi, { isLoading:appointLoading }] = useAppointmentsMutation();
  const [patientandmessage, { isLoading:PandMLoading }] = usePatientMutation();
 
  const [search, setSearch] = useState("");
  const [done, setDone] = useState(false);
  const options = ["Patients", "Appointments", "Messages"];
  const [selectedOption, setSelectedOption] = useState("Patients");

  const init = {
    content: "",
    context: "",
    date_recorded: "",
    record_type: "",
    timestamp: "",
    full_name: "",
    id: 0,
  };
  const [messagesData, setMessagesData] = useState([init]);


   const [state, setState] = useState({'Patients': patientsData,
                                        'Appointments': appointmentsData,
     'Messages': messagesData,
   });
  

  
  
  useEffect(() => {
      // get patients
        let data = {
            data: { action: 'get_all', data:{} },
            token: user.usertoken
          }
        if(user.logedin){
        patientsApi(data).then(data => {
          if (data.error) {
            dispatch(addAlert({ ...data.error, page: "search_screen" }))
        }
          
          if (data.data) {
            dispatch(addPatients({ data: data.data,save:true }))
          }
        })
      // get appointments
      data = {
                   data: { action: 'get_all', data:{} },
                   token: user.usertoken
                 }
               appointmentApi(data).then(data => {
                 if (data.error) {
                   dispatch(addAlert({ ...data.error, page: "search_page" }))
               }
                 
                 if (data.data) {
                   dispatch(addAppointments({ data: data.data,save:true }))
                 }
               })
    // get message and patient
     data = {
          data: { action: "get_all_last", data: {} },
          token: user.usertoken,
        };
        patientandmessage(data).then(data => {
          if (data.error) {
            dispatch(addAlert({ ...data.error, page: "search_page" }));
          }
    
          if (data.data) {
            dispatch(addPatientAndMessage({ ...data.data, save: true }));
          }
        });
        
      }      
      
      }, [user])
  

  useEffect(() => {
      let data = [init];
      if (patientAndMessages) {
        const { patients, messages } = patientAndMessages;
  
        if (messages) {
          for (let index = 0; index < messages.length; index++) {
            let patientData = init;
  
            patientData = { ...patientData, ...messages[0], ...patients[0] };
            data.push(patientData);
          }
          data = data.slice(1);
          setMessagesData(data);
          setState({ ...state, Messages: data })
          setDone(true)
        }
      }
    }, [patientAndMessages]);


   useEffect(() => {
    
    if (search) {
      if (selectedOption == 'Messages') {
        const filtered = messagesData.filter(elem => search_name(elem.full_name,search))
        setState({...state,Messages: filtered})
      } else if (selectedOption == 'Patients') {
         const filtered = patientsData.filter(elem=>search_name(elem.full_name,search))
        setState({...state,Patients:filtered})
      } else if (selectedOption == 'Appointments') {
        const filtered = appointmentsData.filter(elem=>search_name(elem.patient_name,search))
        setState({...state,Appointments:filtered})
      }
      
    } else if (done) {
      if (selectedOption == 'Messages') {
        setState({...state,Messages:messagesData})
      }else if (selectedOption == 'Patients') {
        setState({...state,Patients:patientsData})
      }else if (selectedOption == 'Appointments') {
        setState({...state,Appointments:appointmentsData})
      }
      
    }
  
  }, [search])
 

  return (
    <ScrollView>
      <View style={style.container}>
        <SearchInput value={search} setValue={setSearch} placeholder="Search" />

        <View style={style.options}>
          {options.map(option => (
            <Pressable
              style={[
                style.option,
                option === selectedOption && style.activeOption,
              ]}
              key={option}
              onPress={() => setSelectedOption(option)}>
              <Text>{option}</Text>
            </Pressable>
          ))}
        </View>

        {selectedOption === "Patients" && (
          <PatientList patientsData={state[selectedOption]} />
        )}
        {selectedOption === "Appointments" && (
          <AppointmentsList appointmentsData={state[selectedOption]} />
        )}
        {selectedOption === "Messages" && (
          <MessageList messagesData={state[selectedOption]} />
        )}
      </View>
    </ScrollView>
  );
};

export default SearchScreen;

const style = StyleSheet.create({
  container: {
    ...globalStyles.dashboardContainer,
    marginBottom: 16,
  },
  options: {
    marginTop: 16,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "flex-start",
    rowGap: 8,
    columnGap: 16,
    width: "100%",
    flexWrap: "wrap",
  },
  option: {
    backgroundColor: theme.colors["neutral-100"],
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  activeOption: {
    backgroundColor: theme.colors["purple-200"],
  },
});
