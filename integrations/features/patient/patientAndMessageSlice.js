import { readFromAsyncStorage, writeToAsyncStorage } from '../../async_store';
import { createSlice } from '@reduxjs/toolkit';

const initialData = {
  patients: [{ full_name: "", id: 0 }],
  messages: [{
    content: '', context: '', date_recorded: '',
    record_type:"",timestamp:""
  }],
  
}


export const get_initial_patient_and_message_data = async () => {
  let data = await readFromAsyncStorage("patientandmessage")
  let patientandmessageData = initialData

  if (!data) {
    writeToAsyncStorage("patientandmessage", initialData)
  } else {
    patientandmessageData = data 
  }
  return patientandmessageData
} 


export const patientAndMessageSlice = createSlice({
  name: 'patientandmessage',
  initialState: initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addPatientAndMessage: (state, action) => {
      console.log(action.payload)
      console.log('dispatched')
      let save = action.payload.save
      delete action.payload.save
      state.messages = action.payload.messages
      state.patients = action.payload.patients
      console.log(save)
      console.log(action.payload)
      save ? writeToAsyncStorage("patientandmessage", action.payload):null
    }
  },
 
});

export const {addPatientAndMessage} = patientAndMessageSlice.actions;

export default patientAndMessageSlice.reducer;

