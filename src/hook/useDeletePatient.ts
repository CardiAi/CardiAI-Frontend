import { deletePatient } from "@/http";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useDeletePatient() {
  const { patientID } = useParams();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deletePatient(patientID || ""),
  });
  return { mutate, isPending };
}
