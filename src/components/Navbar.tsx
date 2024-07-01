
// import React from "react";
// import { Link } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";

// const NavBar: React.FC = () => {
//   return (
//     <nav className="bg-blue-950 p-4 flex justify-between items-center text-white">
//       <div className="text-xl font-bold">
//         <Link to="/" className="hover:text-gray-200">
//           Log
//         </Link>
//       </div>
//       <div className="text-xl">
//         <Link to="/profile">
//           <span style={{ fontSize: "2rem", cursor: "pointer" }}>
//             <FaUserCircle />
//           </span>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;


import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../models/Data";
import { useAppController } from "../controllers/controller";

const NavBar: React.FC = () => {
  const { state } = useAppState();
  const { loadUser } = useAppController();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (!state.user) {
    return <div>Loading...</div>;
  }

  const initials = state.user.name
    .split(" ")
    .map((word: string) => word[0])
    .join("");

  return (
    <nav className="bg-blue-950 p-4 flex justify-between items-center text-white">
      <div className="text-xl font-bold">
        <Link to="/" className="hover:text-gray-200">
          Swift Logo
        </Link>
      </div>
      <Link to="/profile" className="flex items-center space-x-2">
        <div className="bg-white text-blue-950 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
          {initials}
        </div>
        <span>{state.user.name}</span>
      </Link>
    </nav>
  );
};

export default NavBar;
