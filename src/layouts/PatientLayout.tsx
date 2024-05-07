import PatientDetails from "@/components/PatientDetails";
import { useGetPatient } from "@/hook/useGetPatient";

import { Outlet } from "react-router-dom";

function PatientLayout() {
  const { data, isLoading, error } = useGetPatient();

  if (error)
    return (
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-red-600 font-bold lg:text-4xl md:text-3xl sm:text-xl text-lg">
          Invalid Patient ID
        </h1>
      </div>
    );
  return (
    <div className="md:py-5 py-2 flex flex-col flex-1">
      {/* Patient data */}
      <PatientDetails isLoading={isLoading} data={data} />
      <hr className="my-4" />
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}

export default PatientLayout;
