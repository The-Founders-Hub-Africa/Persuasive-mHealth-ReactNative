import { configureStore } from '@reduxjs/toolkit';
import { mediAppApi } from './features/apis/apiSlice';
import userslice from './features/user/usersSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import initializeStore from './initializeStore';
import alertSlice  from './features/alert/alertSlice';
import patientAndMessageSlice from './features/patient/patientAndMessageSlice';
import whatsappMessageSlice from './features/whatsappMessages/whatsappMessageSlice';
import  patientsSlice  from './features/patient/patientsSlice';
import appointmentsSlice  from './features/appointment/appointmentsSlice';
import  boardUserSlice  from './features/user/boarderUserSlice';

export const store = configureStore({
  reducer: {
    user: userslice,
    alert: alertSlice,
    patientandmessage: patientAndMessageSlice,
    whatsappMessage: whatsappMessageSlice,
    patients: patientsSlice,
    appointments: appointmentsSlice,
    board: boardUserSlice,
    [mediAppApi.reducerPath] : mediAppApi.reducer
  },
  middleware : getDefaultMiddleware =>
  getDefaultMiddleware().concat([mediAppApi.middleware]),
});



initializeStore(store);

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




