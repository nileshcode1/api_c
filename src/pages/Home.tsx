import React from "react";
import NavBar from "../components/Navbar";
import CommentsPage from "./CommentsPage";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <CommentsPage />
      </div>
    </div>
  );
};

export default Home;
