import { usePatientsData } from "@/hook/usePatientsData";

import { useSearchParams } from "react-router-dom";
import PatientCard from "./PatientCard";
import AppPagination from "./AppPagination";
import { IPatient } from "@/Interfaces";
function PatientsView() {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError } = usePatientsData(
    parseInt(searchParams.get("page") || "1") || 1
  );
  if (isLoading)
    return (
      <section className="grid min-[600px]:grid-cols-2 gap-5 py-3 flex-1">
        {/* Patients Container  */}
        {Array.from({ length: 10 }, (_, i) => (
          <PatientCard isLoading key={i} />
        ))}
      </section>
    );
  if (isError)
    return (
      <section className="flex flex-1 items-center justify-center">
        <h2 className="text-red-600 font-bold md:text-xl sm:text-lg">
          An Error Occured While Fetching Patients.
        </h2>
      </section>
    );
  return (
    <>
      <section className="grid min-[600px]:grid-cols-2 gap-5 py-3 flex-1">
        {/* Patients Container  */}
        {data?.data?.length ? (
          data?.data?.map((patient: IPatient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))
        ) : (
          <h2 className="self-center text-center col-span-2 font-bold md:text-xl sm:text-lg">
            No Patients Found
          </h2>
        )}
      </section>
      {data?.data?.length && data?.meta?.last_page > 1 && (
        <AppPagination meta={data?.meta} />
      )}
    </>
  );
}

export default PatientsView;
