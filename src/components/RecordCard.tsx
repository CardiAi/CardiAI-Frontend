import { IRecord } from "@/Interfaces";
import { Skeleton } from "./ui/skeleton";
import { Link, useParams } from "react-router-dom";
import { resultsImgMap, resultsMap } from "@/Maps";

interface IProps {
  isLoading?: boolean;
  record?: IRecord;
}
const RecordCard = ({ isLoading, record }: IProps) => {
  const { patientID } = useParams();
  if (isLoading)
    return (
      <div className="odd:last:col-span-full cursor-pointer max-h-20">
        <div className="bg-secondary-blue hover:bg-slate-300 flex justify-between items-center gap-5 p-2 rounded-xl">
          <div className="flex gap-4 flex-1">
            <Skeleton className="size-16 rounded-full bg-[#DB45451A] flex items-center justify-center" />
            <div className="flex  justify-center gap-2 flex-1 items-center max-w-52">
              <Skeleton className="font-bold w bg-primary-blue flex-1 h-4" />
            </div>
          </div>
          <Skeleton className="w-32 bg-primary-blue h-4" />
        </div>
      </div>
    );
  return (
    <Link
      className="odd:last:col-span-full max-h-20"
      to={`/patient/${patientID}/${record?.id}`}
    >
      <div className="bg-secondary-blue hover:bg-slate-300 flex justify-between items-center gap-5 p-2 rounded-xl">
        <div className="flex gap-4 items-center">
          <div className="size-16 rounded-full bg-[#DB45451A] flex items-center justify-center">
            <img
              src={
                record?.result ? resultsImgMap[record.result] : resultsImgMap[0]
              }
              alt=""
            />
          </div>
          <p className="font-bold">
            {new Date(record?.created_at || Date.now()).toLocaleDateString()}
          </p>
        </div>
        <p className="flex-1 text-right text-xs font-bold">
          {record?.result != null ? resultsMap[record?.result] : "No Result"}
        </p>
      </div>
    </Link>
  );
};

export default RecordCard;
