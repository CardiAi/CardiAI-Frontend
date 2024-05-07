import CreateDiagnosisFormDialog from "@/components/CreateDiagnosisFormDialog";
import RecordsView from "@/components/RecordsView";

function PatientPage() {
  return (
    <div className="flex-1 flex flex-col">
      <h1 className="font-bold lg:text-5xl md:text-4xl sm:text-3xl text-2xl">
        Records
      </h1>
      <RecordsView />
      <CreateDiagnosisFormDialog />
    </div>
  );
}

export default PatientPage;
