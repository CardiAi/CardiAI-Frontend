import {
  chestPainMap,
  ecgResultsMap,
  resultsImgMap,
  resultsMap,
  slopeMap,
  thalMap,
} from "@/Maps";
import { Separator } from "@/components/ui/separator";
import { useGetRecord } from "@/hook/useGetRecord";

function RecordPage() {
  const { data, isError, isLoading } = useGetRecord();
  if (isLoading)
    return (
      <div className="flex-1 bg-secondary-blue rounded-md flex justify-center items-center">
        <svg
          className="animate-spin size-16 text-primary-blue "
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  if (isError)
    return (
      <div className="flex-1 bg-secondary-blue rounded-md flex justify-center items-center">
        <h2 className="font-bold text-red-600 text-lg">
          The Record is not found.
        </h2>
      </div>
    );
  return (
    <div className="flex-1 bg-secondary-blue rounded-md p-3">
      <div className="flex items-center gap-3">
        <div className="size-16 bg-[#DB45451A] rounded-full flex justify-center items-center">
          <img src={resultsImgMap[data.result || 0]} />
        </div>
        <div className="space-y-1">
          <p>
            <span className="font-bold">Record ID:</span> {data.id}
          </p>
          <p>
            <span className="font-bold">Date:</span>{" "}
            {new Date(data.created_at).toLocaleDateString()}
          </p>
          <p>
            <span className="font-bold">Result:</span>{" "}
            {resultsMap[data.result || 0]}
          </p>
        </div>
      </div>
      <Separator className="my-3 bg-primary-blue" />
      <div className="">
        <p>
          <span className="font-bold">Chest Pain Type:</span>{" "}
          {data.chest_pain
            ? chestPainMap[data.chest_pain as keyof typeof chestPainMap]
            : "Unknown"}
        </p>
        <p>
          <span className="font-bold">ECG Results:</span>{" "}
          {data.ecg
            ? ecgResultsMap[data.ecg as keyof typeof ecgResultsMap]
            : "Unknown"}
        </p>
        <p>
          <span className="font-bold">Slope of the peak exercise:</span>{" "}
          {data.slope
            ? slopeMap[data.slope as keyof typeof slopeMap]
            : "Unknown"}
        </p>
        <p>
          <span className="font-bold">Thalassemia:</span>{" "}
          {data.thal ? thalMap[data.thal as keyof typeof thalMap] : "Unknown"}
        </p>
        <p>
          <span className="font-bold">Exercise Angina:</span>{" "}
          {data.exercise_angina ? "Yes" : "No"}
        </p>
        <p>
          <span className="font-bold">Resting blood pressure:</span>{" "}
          {data.blood_pressure == null
            ? "Unknown"
            : data.blood_pressure + " mm Hg"}
        </p>
        <p>
          <span className="font-bold">Cholesterol measure:</span>{" "}
          {data.cholesterol == null ? "Unknown" : data.cholesterol + " mg/dl"}
        </p>
        <p>
          <span className="font-bold">Maximum heart rate:</span>{" "}
          {data.max_thal ?? "Unknown"}
        </p>
        <p>
          <span className="font-bold">Coronary Artery:</span>{" "}
          {data.coronary_artery ?? "Unknown"}
        </p>
        <p>
          <span className="font-bold">Fasting blood sugar:</span>{" "}
          {data.blood_sugar == null ? "Unknown" : data.blood_sugar + " mg/dl"}
        </p>
        <p>
          <span className="font-bold">Old peak:</span>{" "}
          {parseFloat(data.old_peak) ?? "Unknown"}
        </p>
      </div>
    </div>
  );
}

export default RecordPage;
