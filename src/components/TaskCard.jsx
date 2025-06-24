import React from "react";
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const statusOrder = ["To Do", "In Progress", "Done"];

const priorityColors = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800"
};

const statusColors = {
  "To Do": "bg-gray-100 text-gray-800",
  "In Progress": "bg-blue-100 text-blue-800",
  "Done": "bg-green-100 text-green-800"
};

const TaskCard = ({
  task,
  onStatusChange,
  onEdit,
  onDelete
}) => {
  const currentStatusIndex = statusOrder.indexOf(task.status);

  return (
    <div
      className={`bg-white p-3 sm:p-4 rounded-xl shadow-sm border-l-4 ${
        task.priority === "High" ? "border-l-red-500" :
        task.priority === "Medium" ? "border-l-yellow-500" :
        "border-l-green-500"
      } mb-3 hover:shadow-md transition-all duration-200 flex flex-col gap-2`}
      tabIndex={0}
      aria-label={`Task: ${task.title}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={task.status === "Done"}
            onChange={() =>
              onStatusChange(task.id, task.status === "Done" ? "To Do" : "Done")
            }
            className="mt-1 h-4 w-4 sm:h-5 sm:w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 flex-shrink-0"
            aria-label={
              task.status === "Done"
                ? "Mark as not completed"
                : "Mark as completed"
            }
          />
          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium text-gray-800 text-sm sm:text-base ${
                task.status === "Done" ? "line-through opacity-70" : ""
              }`}
            >
              {task.title}
            </h3>
            
            <div className="flex flex-wrap gap-1 mt-1 sm:mt-2">
              <span className={`px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold ${statusColors[task.status]}`}>
                {task.status}
              </span>
              <span className={`px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold ${priorityColors[task.priority]}`}>
                {task.priority} Priority
              </span>
            </div>
            
            {task.description && (
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
                {task.description}
              </p>
            )}
            
            {task.dueDate && (
              <div className="text-xs text-gray-500 mt-1 sm:mt-2 flex items-center">
                <span className="mr-1">📅</span>
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end sm:justify-normal items-center gap-1 sm:gap-1 mt-1 sm:mt-0">
          {currentStatusIndex > 0 && (
            <button
              title={`Move to ${statusOrder[currentStatusIndex - 1]}`}
              onClick={() =>
                onStatusChange(task.id, statusOrder[currentStatusIndex - 1])
              }
              className="text-gray-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 transition"
            >
              <FaArrowLeft size={12} className="sm:w-3.5 sm:h-3.5" />
            </button>
          )}
          
          {currentStatusIndex < statusOrder.length - 1 && (
            <button
              title={`Move to ${statusOrder[currentStatusIndex + 1]}`}
              onClick={() =>
                onStatusChange(task.id, statusOrder[currentStatusIndex + 1])
              }
              className="text-gray-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 transition"
            >
              <FaArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
            </button>
          )}
          
          <button
            onClick={() => onEdit(task)}
            className="text-gray-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 transition"
          >
            <FaEdit size={12} className="sm:w-3.5 sm:h-3.5" />
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition"
          >
            <FaTrash size={12} className="sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;