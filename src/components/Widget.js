import React from "react";
import { useDispatch } from "react-redux";
import { removeWidget } from "../store/dashboardSlice";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"]; // Blue, Green, Amber, Red

const Widget = ({ categoryId, widget }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  return (
    <div className="w-[300px] h-[300px] m-3 border rounded-lg shadow bg-white p-3 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-base">{widget.name}</h3>
        <button
          onClick={handleRemove}
          className="text-red-500 font-bold hover:text-red-700"
        >
          ✕
        </button>
      </div>

      {/* Chart Rendering */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          {widget.chartType === "line" ? (
            <LineChart data={widget.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(widget.data[0])[0]} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={Object.keys(widget.data[0])[1]}
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          ) : widget.chartType === "bar" ? (
            <BarChart data={widget.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(widget.data[0])[0]} />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey={Object.keys(widget.data[0])[1]}
                fill="#b91010ff"
              />
            </BarChart>
          ) : widget.chartType === "doughnut" ? (
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={widget.data}
                dataKey={Object.keys(widget.data[0])[1]}
                nameKey={Object.keys(widget.data[0])[0]}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                label
              >
                {widget.data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <p className="text-gray-400">Unsupported chart type</p>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Widget;
