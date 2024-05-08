import { getRecord } from "@/http";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useGetRecord() {
  const { recordID } = useParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["record", recordID],
    queryFn: () => getRecord(recordID || ""),
  });
  return { data, isError, isLoading };
}
