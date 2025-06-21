import { View, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "@/styles/global";
import SearchInput from "@/components/common/SearchInput";
// import { messagesData } from "@/src/helpers";
import MessageList from "@/components/common/MessageList";
import { usePatientMutation } from "@/integrations/features/apis/apiSlice";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { addPatientAndMessage } from "@/integrations/features/patient/patientAndMessageSlice";
import { addAlert } from "@/integrations/features/alert/alertSlice";
import { useFocusEffect, useRouter } from "expo-router";
// import Alert_System from "@/src/integrations/features/alert/Alert";

const MessagesScreen = ({ canSearch }: { canSearch: boolean }) => {
  const [search, setSearch] = useState("");  
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const patientAndMessages = useAppSelector(state => state.patientandmessage);
  const [patientandmessage, { isLoading }] = usePatientMutation();
  // const [skip, setSkip] = useState(true)
  const init = {
    content: "",
    context: "",
    date_recorded: "",
    record_type: "",
    timestamp: "",
    full_name: "",
    id: 0,
  };
  const [finalData, setFinalData] = useState([init]);
  // const { data:patients,error,isError }  = usePatientGetQuery({action:'get_all_last',token:user.usertoken},{skip})
  // useEffect(() => {
  //   if (patients) {
  //     console.log(patients)
  //     console.log(error)
  //     // setFinalData(article.data)
  //   }

  // }, [patients,error])

      const navigation  = useRouter()
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
    
        if(user){
          setLoading(false);
        }
    
        if(!user.logedin && !loading){
            console.log('user not logged in reporting from home screen')
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
      
  
  useFocusEffect(
    React.useCallback(() => {
    
    let data = {
      data: { action: "get_all_last", data: {} },
      token: user.usertoken,
    };
    patientandmessage(data).then(data => {
      if (data.error) {
        dispatch(addAlert({ ...data.error, page: "message_list" }));
      }

      if (data.data) {
        dispatch(addPatientAndMessage({ ...data.data, save: true }));
      }
    });
      
    }, [])
  );  

  useEffect(() => {
    let data = [init];
    if (patientAndMessages) {
      const { patients, messages } = patientAndMessages;

      if (messages) {
        for (let index = 0; index < messages.length; index++) {
          let patientData = init;

          patientData = { ...patientData, ...messages[index], ...patients[index] };
          data.push(patientData);
        }
        data = data.slice(1);
        setFinalData(data);
      }
    }

    // console.log(finalData)
  }, [patientAndMessages]);

  return (
    <ScrollView>
      {/* <Alert_System /> */}
      <View style={globalStyles.dashboardContainer}>
        {/* Search input */}
        {canSearch && (
          <View
            style={{
              marginBottom: 24,
              width: "100%",
            }}>
            <SearchInput
              value={search}
              setValue={setSearch}
              placeholder="Search"
            />
          </View>
        )}

        {/* Messages */}
        <Text>
          <MessageList messagesData={finalData} />
        </Text>
      </View>
    </ScrollView>
  );
};

export default MessagesScreen;
