import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addWidget } from "../store/dashboardSlice";
import Widget from "./Widget";

const Category = ({ category, searchTerm }) => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");

  const handleAdd = () => {
    if (!widgetName || !widgetText) return;
    const newWidget = {
      id: Date.now().toString(),
      name: widgetName,
      text: widgetText
    };
    dispatch(addWidget({ categoryId: category.id, widget: newWidget }));
    setWidgetName("");
    setWidgetText("");
    setShowForm(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-3">{category.name}</h2>
      <div className="d-flex">
        {category.widgets
          .filter((w) =>
            w.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((w) => (
            <Widget key={w.id} categoryId={category.id} widget={w} />
          ))}
      {/* </div> */}

      {showForm ? (
        <div className="mt-3 space-y-2">
          <input
            type="text"
            placeholder="Widget Name"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Widget Text"
            value={widgetText}
            onChange={(e) => setWidgetText(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="mt-3 text-blue-600 font-medium"
        >
          + Add Widget
        </button>
      )}
    </div>
    </div>
  );
};

export default Category;
