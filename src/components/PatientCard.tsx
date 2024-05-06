import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { IPatient } from "@/Interfaces";

function PatientCard({
  isLoading,
  patient,
}: {
  isLoading?: boolean;
  patient?: IPatient;
}) {
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
    <Link className="odd:last:col-span-2 max-h-20" to={"/login"}>
      <div className="bg-secondary-blue hover:bg-slate-300 flex justify-between items-center gap-5 p-2 rounded-xl">
        <div className="flex gap-4">
          <div className="size-16 rounded-full bg-[#DB45451A] flex items-center justify-center">
            <img src="/Degree IV.svg" alt="" />
          </div>
          <div className="flex flex-col justify-center gap-2">
            <h2 className="font-bold max-w-32 whitespace-nowrap text-ellipsis overflow-hidden">
              {patient?.name}
            </h2>
            <p className="text-sm text-[#552636]">
              {patient?.last_result || "Not Found"}
            </p>
          </div>
        </div>
        <p className="flex-1 text-right text-xs">
          {new Date(patient?.created_at || Date.now()).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

export default PatientCard;
