import { createRecord } from "@/http";
import { diagnosisSchema } from "@/schemas";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { z } from "zod";

export function useCreateRecord() {
  const { patientID } = useParams();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof diagnosisSchema>) =>
      createRecord(patientID || "", data),
  });
  return { mutate, isPending };
}
