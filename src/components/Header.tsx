import { Link } from "react-router-dom";

import ProfilePopover from "./ProfilePopover";

function Header() {
  return (
    <header className=" bg-primary-blue sticky top-0 z-50 w-screen">
      <div className="container py-2 flex items-center justify-between">
        <Link to={"/"}>
          <img src="/Logo.svg" className="brightness-0 invert" alt="Logo" />
        </Link>

        <ProfilePopover />
      </div>
    </header>
  );
}

export default Header;
