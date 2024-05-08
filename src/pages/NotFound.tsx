import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-3">
      <h1 className="lg:text-7xl font-bold md:text-5xl sm:text-3xl text-xl">
        404
      </h1>
      <p className="lg:text-5xl font-bold  md:text-3xl sm:text-xl text-lg">
        Page is not found.
      </p>
      <Link
        to="/"
        className="text-primary-blue font-bold text-lg hover:text-secondary-blue"
      >
        Click here to go back to home page.
      </Link>
    </div>
  );
}

export default NotFound;
