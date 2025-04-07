import { readFromAsyncStorage, writeToAsyncStorage } from '../../async_store';
import { createSlice } from '@reduxjs/toolkit';

const initialData = {
  boarded: false,
  registered: false,
  navigate:false,
  old: null
}

export const get_initial_board_data = async () => {
  let data = await readFromAsyncStorage("board")
  let userData = initialData
  if (!data) {
    writeToAsyncStorage("board", initialData)
  } else {
    userData = data 
  }
  return userData
} 


export const boardUserSlice = createSlice({
  name: 'board',
  initialState: initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    boardUser: (state) => {
      state.boarded = true
      state.navigate = true
      writeToAsyncStorage("board", state)
    },
    userRegistered: (state) => {
      state.registered = true
      state.navigate = true
      writeToAsyncStorage("board", state)
    },
    loadData: (state, action) => {
      state.boarded = action.payload.boarded
      state.registered = action.payload.registered
      state.navigate = true
    },
    addOld: (state, action) => {
      state.old = action.payload
      state.navigate = false
      writeToAsyncStorage("board", state)
    },
    clearOld: (state) => {
      state.old = null
      state.navigate = true
      writeToAsyncStorage("board", state)
    },
  },
});

export const { boardUser,userRegistered,loadData,addOld,clearOld } = boardUserSlice.actions;

export default boardUserSlice.reducer;
