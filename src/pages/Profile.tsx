// import React, { useEffect } from "react";
// import { useAppState } from "../models/Data";
// import { useAppController } from "../controllers/controller";

// const Profile: React.FC = () => {
//   const { state } = useAppState();
//   const { loadUser } = useAppController();

//   useEffect(() => {
//     loadUser();
//   }, [loadUser]);

//   if (!state.user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Profile</h2>
//       <div className="bg-white p-4 rounded shadow">
//         <p>
//           <strong>ID:</strong> {state.user.id}
//         </p>
//         <p>
//           <strong>Name:</strong> {state.user.name}
//         </p>
//         <p>
//           <strong>Username:</strong> {state.user.username}
//         </p>
//         <p>
//           <strong>Email:</strong> {state.user.email}
//         </p>
//         <p>
//           <strong>Address:</strong> {state.user.address.street},{" "}
//           {state.user.address.suite}, {state.user.address.city},{" "}
//           {state.user.address.zipcode}
//         </p>
//         <p>
//           <strong>Phone:</strong> {state.user.phone}
//         </p>
//         <p>
//           <strong>Website:</strong> {state.user.website}
//         </p>
//         <p>
//           <strong>Company:</strong> {state.user.company.name} -{" "}
//           {state.user.company.catchPhrase}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect } from "react";
import { useAppState } from "../models/Data";
import { useAppController } from "../controllers/controller";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { state } = useAppState();
  const { loadUser } = useAppController();
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (!state.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10 ">
      <div className="text-xl font-semibold mb-4 mx-20">
        <button className="text-blue-600 mr-2" onClick={() => navigate("/")}>
          {"<"}{" "}
        </button>
        Welcome, {state.user.name}
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-90 mx-20 h-100">
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0 mr-4">
            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-700">
              {state.user.name.charAt(0)}
              {state.user.name.split(" ")[1]?.charAt(0)}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{state.user.name}</h2>
            <p className="text-gray-600">{state.user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">User ID</label>
            <div className="bg-gray-100 p-2 rounded">{state.user.id}</div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 ">Name</label>
            <div className="bg-gray-100 p-2 rounded">{state.user.name}</div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email ID</label>
            <div className="bg-gray-100 p-2 rounded">{state.user.email}</div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Address</label>
            <div className="bg-gray-100 p-2 rounded">
              {state.user.address.street}, {state.user.address.suite},{" "}
              {state.user.address.city}, {state.user.address.zipcode}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Phone</label>
            <div className="bg-gray-100 p-2 rounded">{state.user.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
