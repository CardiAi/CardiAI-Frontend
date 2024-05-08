export interface IPatient {
  id: number;
  name: string;
  gender: "male" | "female";
  age: number;
  last_record_date: string;
  last_result: string;
  created_at: string;
}
interface ILink {
  active: boolean;
  label: string;
  url: string | null;
}
export interface IPatientsMeta {
  current_page: number;
  last_page: number;
  path: string;
  links: ILink[];
}
type chest_pain =
  | "typical angina"
  | "atypical angina"
  | "non-anginal"
  | "asymptomatic";
export interface IRecord {
  id: number;
  chest_pain: chest_pain;
  blood_pressure?: number;
  cholesterol?: number;
  blood_sugar: number;
  max_thal: number;
  exercise_angina: number;
  coronary_artery: 2;
  result: 0 | 1 | 2 | 3 | 1;
  created_at: string;
}
