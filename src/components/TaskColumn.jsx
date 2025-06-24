import React from "react";
import TaskCard from "./TaskCard";

const statusIcons = {
  "To Do": "📝",
  "In Progress": "⏳",
  "Done": "✅"
};

const TaskColumn = ({
  status,
  tasks,
  onStatusChange,
  onEdit,
  onDelete
}) => (
  <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 p-5 rounded-2xl min-h-[220px] shadow-lg border border-blue-100 transition hover:shadow-2xl">
    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-700">
      <span className="text-2xl">{statusIcons[status]}</span>
      {status}
    </h2>
    {tasks.length === 0 ? (
      <div className="text-gray-400 italic flex flex-col items-center py-8">
        <span className="text-3xl mb-2">🗒️</span>
        <span>No tasks here yet!</span>
      </div>
    ) : (
      tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))
    )}
  </div>
);

export default TaskColumn;
