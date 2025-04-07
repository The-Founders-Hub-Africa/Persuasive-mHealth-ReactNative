import { ImageSourcePropType } from "react-native";

export interface PatientProps {
  id: number;
  full_name: string;
  whatsapp_number: string;
  identifier: string;
  image: ImageSourcePropType | undefined;
  document: ImageSourcePropType | undefined;
  date: string;
  date_of_birth: string;
  address: string;
  medical_practitioner: number;
  next_of_kin: string;
  kin_number: string;
  about: string;
  genotype: string;
  gender: string;
  condition: string;
  symptoms: string;
}
