import { useRecordsData } from "@/hook/useRecordsData";
import AppPagination from "./AppPagination";
import { IRecord } from "@/Interfaces";
import RecordCard from "./RecordCard";

const RecordsView = () => {
  const { data, isError, isLoading } = useRecordsData();
  if (isError) return null;
  if (isLoading)
    return (
      <h2 className="text-center font-bold md:text-xl sm:text-lg">
        Loading...
      </h2>
    );
  console.log(data);
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
