import CreatePatientFormDialog from "@/components/CreatePatientFormDialog";
import DegreeIV from "@/assets/Degree IV.svg";
import { Skeleton } from "./ui/skeleton";
import DeletePatientDialog from "./DeletePatientDialog";
import { resultsImgMap, resultsMap } from "@/Maps";
interface IData {
  name: string;
  age: number;
  gender: "male" | "female";
  last_result: number;
}
interface IProps {
  data: IData;
  isLoading?: boolean;
}
function PatientDetails({ data, isLoading }: IProps) {
  if (isLoading)
    return (
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-4 items-center">
          <Skeleton className="size-16 rounded-full bg-[#DB45451A] flex items-center justify-center" />
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-primary-blue h-7 w-28" />
            <div className="flex gap-5">
              <Skeleton className="bg-primary-blue h-6 w-20" />
              <Skeleton className="bg-primary-blue h-6 w-10" />
            </div>
            <Skeleton className="bg-primary-blue h-6 w-20" />
          </div>
        </div>
        {/* Patient Control  */}
        <div className="flex gap-3 ml-auto">
          <Skeleton className="bg-primary-blue size-10" />
          <Skeleton className="bg-red-700 size-10" />
        </div>
      </div>
    );
  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      <div className="flex gap-4 items-center">
        <div className="size-16 rounded-full bg-[#DB45451A] flex items-center justify-center">
          <img
            src={
              data.last_result !== null
                ? resultsImgMap[data.last_result]
                : DegreeIV
            }
            alt=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">{data.name}</h2>
          <div className="flex justify-between w-full gap-5">
            <p>{data.age} years old</p>
            <p>
              {data.gender.replace(
                data.gender[0],
                data.gender[0].toUpperCase()
              )}
            </p>
          </div>
          <p className="font-bold">
            {data.last_result !== null
              ? resultsMap[data.last_result]
              : "Not Diagnosed yet."}
          </p>
        </div>
      </div>
      {/* Patient Control  */}
      <div className="flex gap-3 ml-auto">
        <CreatePatientFormDialog
          patient={{ age: data.age, gender: data.gender, name: data.name }}
          isEditing
        />
        <DeletePatientDialog />
      </div>
    </div>
  );
}

export default PatientDetails;
