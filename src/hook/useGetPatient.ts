import { getPatientData } from "@/http";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useGetPatient() {
  const { patientID } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["patient", patientID],

    queryFn: () => getPatientData(patientID || ""),
  });
  return { data, isLoading, isError, error };
}
