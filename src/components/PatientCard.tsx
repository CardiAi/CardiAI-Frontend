import React from "react";
import { Link } from "react-router-dom";

function PatientCard() {
  return (
    <Link to={"/login"}>
      <div className="bg-secondary-blue hover:bg-slate-300 flex justify-between items-center gap-5 p-2 rounded-xl">
        <div className="flex gap-4">
          <div className="size-16 rounded-full bg-[#DB45451A] flex items-center justify-center">
            <img src="/Degree IV.svg" alt="" />
          </div>
          <div className="flex flex-col justify-center gap-2">
            <h2 className="font-bold max-w-32 whitespace-nowrap text-ellipsis overflow-hidden">
              John Doe
            </h2>
            <p className="text-sm text-[#2B2829]">Degree IV</p>
          </div>
        </div>
        <p className="flex-1 text-right text-xs">2/5/2024</p>
      </div>
    </Link>
  );
}

export default PatientCard;
