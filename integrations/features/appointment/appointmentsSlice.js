import { createSlice } from '@reduxjs/toolkit';
import { readFromAsyncStorage, writeToAsyncStorage } from '../../async_store';
import {convertDate} from  '../../axios_store'
// medical_practitioner
const initialData = {
  data: [{
        id: 0,
        patient: 0,
        condition: '',
        symptoms: '',
        notes: '',
        document: undefined,
        date: '',
        time: '',
        mode: '',
        status:'pending',
        medical_practitioner: 0,
        patient_name: '',
}]}


export const get_initial_appointments_data = async () => {
    let data = await readFromAsyncStorage("appointments")
    let userData = initialData
    if (!data) {
      writeToAsyncStorage("appointments", initialData)
      // userData = initialData
    } else {
      userData = data 
    }
    return userData
  } 
  

export const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState:initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addAppointments: (state, action) => {
      let save = action.payload.save
      delete action.payload.save
      state.data = action.payload.data
      save ? writeToAsyncStorage("appointments", action.payload):null
        
      },
    addSingleAppointment: (state, action) => {
      let filtered = state.data.filter(data => data.id != action.payload.id)
      filtered = [...filtered, action.payload]
      filtered.sort((a, b) => {
        const dateA = new Date(`${convertDate(a.date)}T${a.time}`);
        const dateB = new Date(`${convertDate(b.date)}T${b.time}`);
        return   dateA - dateB ;
      });
      
        state.data = filtered
        writeToAsyncStorage("appointments", {data:state.data})
    },
    clearAppointments :state=>{
      state = initialData
      writeToAsyncStorage("appointments", initialData)
    }
   
  },
 
});

// export const getuserToken = (state)=>state.token
export const { addAppointments,clearAppointments,addSingleAppointment} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
