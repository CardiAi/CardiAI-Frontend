import { useRecordsData } from "@/hook/useRecordsData";
import AppPagination from "./AppPagination";
import { IRecord } from "@/Interfaces";
import RecordCard from "./RecordCard";
import { Navigate, useParams, useSearchParams } from "react-router-dom";

const RecordsView = () => {
  const [searchParams] = useSearchParams();
  const { patientID } = useParams();
  const { data, isError, isLoading } = useRecordsData(
    parseInt(searchParams.get("page") || "1")
  );
  if (isError)
    return (
      <h2 className="text-xl text-red-600 font-bold text-center mt-8">
        Something went wrong, Please try again later.
      </h2>
    );
  if (isLoading)
    return (
      <section className="grid min-[600px]:grid-cols-2 gap-5 py-3 flex-1 auto-rows-[80px]">
        {Array.from({ length: 10 }, (_, i) => (
          <RecordCard key={i} isLoading />
        ))}
      </section>
    );
  if (
    // prettier-ignore
    (parseInt(searchParams.get("page") || "1") > 1) &&
    !data
  ) {
    return <Navigate to={`/patient/${patientID}`} replace />;
  }
  return (
    <>
      <section className="grid min-[600px]:grid-cols-2 gap-5 py-3 flex-1 auto-rows-[80px]">
        {/* Patients Container  */}
        {data?.data?.length ? (
          data?.data?.map((record: IRecord) => (
            <RecordCard key={record.id} record={record} />
          ))
        ) : (
          <h2 className="self-center text-center col-span-2 font-bold md:text-xl sm:text-lg">
            No Records Found
          </h2>
        )}
      </section>
      {data?.data?.length && data?.meta?.last_page > 1 && (
        <AppPagination meta={data?.meta} />
      )}
    </>
  );
};

export default RecordsView;
