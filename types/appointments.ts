import { ImageSourcePropType } from "react-native";

export interface AppointmentProps {
  id: number;
  patient:number
  condition: string;
  symptoms: string;
  notes: string;
  date: string;
  time: string;
  mode: string;
  status: string;
  medical_practitioner: number;
  // document: string;
  patient_name: string;
  document: ImageSourcePropType | undefined;
  
}
