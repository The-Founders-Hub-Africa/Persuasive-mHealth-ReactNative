import { createSlice } from '@reduxjs/toolkit';

// medical_practitioner
const initialData = {data:[{
    content: "",
    context: "",
    date_recorded: "",
    get_absolute_url: '', id: 0,
    patient: 4, record_format: "",
    record_id: "",
    record_type: "",
    timestamp: ""
  }]}

export const whatsappMessageSlice = createSlice({
  name: 'whatsappMessage',
  initialState:initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addwhatsappMessage: (state, action) => {
      console.log('from state')
      state.data = [...action.payload]
      // console.log(action.payload)
      // state = [...action.payload]
      
      // console.log(state)
        
    },
    clearwhatsappMessage :state=>{
      state = initialData
    }
   
  },
 
});

// export const getuser = (state)=>state
// export const getuserToken = (state)=>state.token
export const { addwhatsappMessage,clearwhatsappMessage} = whatsappMessageSlice.actions;

export default whatsappMessageSlice.reducer;
