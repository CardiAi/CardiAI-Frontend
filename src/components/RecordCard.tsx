import { IRecord } from "@/Interfaces";
import { Skeleton } from "./ui/skeleton";
import { Link } from "react-router-dom";

interface IProps {
  isLoading?: boolean;
  record?: IRecord;
}
const RecordCard = ({ isLoading, record }: IProps) => {
  if (isLoading)
    return (
      <div className="odd:last:col-span-full cursor-pointer max-h-20">
        <div className="bg-secondary-blue hover:bg-slate-300 flex justify-between items-center gap-5 p-2 rounded-xl">
          <div className="flex gap-4">
            <Skeleton className="size-16 rounded-full bg-[#DB45451A] flex items-center justify-center" />
            <div className="flex flex-col justify-center gap-2">
              <Skeleton className="font-bold max-w-32 bg-primary-blue w-28 h-4" />
              <Skeleton className=" bg-primary-blue h-4 w-16" />
            </div>
          </div>
          <Skeleton className="flex-1 bg-primary-blue h-4" />
        </div>
      </div>
    );
  return (
    <Link
      className="odd:last:col-span-full max-h-20"
      to={`/record/${record?.id}`}
    >
      <div className="bg-secondary-blue hover:bg-slate-300 flex justify-between items-center gap-5 p-2 rounded-xl">
        <div className="flex gap-4">
          <div className="size-16 rounded-full bg-[#DB45451A] flex items-center justify-center">
            <img src="/Degree IV.svg" alt="" />
          </div>
          <p className="font-bold">
            {
              // new Date(record.created_at)
            }
          </p>
        </div>
        <p className="flex-1 text-right text-xs">
          {new Date(record?.created_at || Date.now()).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};

export default RecordCard;
