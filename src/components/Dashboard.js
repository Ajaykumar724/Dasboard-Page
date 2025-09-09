import React, { useState } from "react";
import { useSelector } from "react-redux";
import Category from "./Category";
import SearchBar from "./SearchBar";

const Dashboard = () => {
  const categories = useSelector((state) => state.dashboard.categories);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6">
      <div className="row ms-2 me-2">
        <h1 className="text-2xl font-bold pb-2 pt-2 col-6">Dashboard</h1>
        <SearchBar className="col-6" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-4">
        {categories.map((cat) => (
          <Category key={cat.id} category={cat} searchTerm={searchTerm} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
