import { getPatientRecords } from "@/http";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function useRecordsData(page: number = 1) {
  const { patientID } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getPatientRecords(patientID || "", page),
    queryKey: ["records", patientID, page],
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (page === 1 && data?.meta?.last_page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["records", patientID, page + 1],
        queryFn: () => getPatientRecords(patientID || "", page + 1),
      });
    } else {
      if (data?.meta?.last_page > page) {
        queryClient.prefetchQuery({
          queryKey: ["records", patientID, page + 1],
          queryFn: () => getPatientRecords(patientID || "", page + 1),
        });
      }

      queryClient.prefetchQuery({
        queryKey: ["records", patientID, page - 1],
        queryFn: () => getPatientRecords(patientID || "", page - 1),
      });
    }
  }, [page, data?.meta?.last_page, queryClient, patientID]);
  return { data, isLoading, isError, error };
}
