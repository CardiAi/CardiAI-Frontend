import CreatePatientFormDialog from "@/components/CreatePatientFormDialog";

import { Skeleton } from "./ui/skeleton";
import DeletePatientDialog from "./DeletePatientDialog";
interface IData {
  name: string;
  age: number;
  gender: "male" | "female";
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
            <Skeleton className="bg-primary-blue h-4 w-28" />
            <Skeleton className="bg-primary-blue h-4 w-20" />
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
          <img src="/Degree IV.svg" alt="" />
        </div>
        <div className="flex flex-col gap-2">
          <p>Name: {data.name}</p>
          <p>Age: {data.age}</p>
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
