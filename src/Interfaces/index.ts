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
