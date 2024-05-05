import PatientsControlBox from "@/components/PatientsControlBox";
import PatientsView from "@/components/PatientsView";

export default function HomePage() {
  return (
    <div className=" space-y-4 flex flex-col flex-1 py-5">
      <div className="flex justify-between gap-10 items-center flex-wrap ">
        <h1 className="lg:text-5xl md:text-4xl sm:text-2xl text-xl font-bold text-xl">
          Patients
        </h1>
        <PatientsControlBox />
      </div>
      <PatientsView />
    </div>
  );
}
