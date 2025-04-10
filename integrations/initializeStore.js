import { get_initial_user_data, loginUser } from './features/user/usersSlice';
import {get_initial_board_data, loadData} from './features/user/boarderUserSlice'
import  {
  get_initial_patient_data,
  addPatientAndMessage
} from './features/patient/patientAndMessageSlice'
import {get_initial_appointments_data,addAppointments} from './features/appointment/appointmentsSlice'

import {addPatients, get_initial_patients_data} from './features/patient/patientsSlice'


const initializeStore = async (store) => {
  const user_data = await get_initial_user_data();
  store.dispatch(loginUser({ ...user_data, save: false }));

  const patient_and_message = await get_initial_patient_data()
  store.dispatch(addPatientAndMessage({ ...patient_and_message, save: false }))

  const patients = await get_initial_patients_data()
  store.dispatch(addPatients({ data: patients.data, save: false }))
  
  const appointments = await get_initial_appointments_data()
  store.dispatch(addAppointments({ data: appointments.data, save: false }))

  const board = await get_initial_board_data()
  store.dispatch(loadData({...board}))
};

export default initializeStore;