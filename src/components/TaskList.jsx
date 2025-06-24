import TaskColumn from "./TaskColumn";

const TaskList = ({
  tasks,
  onStatusChange,
  onEdit,
  onDelete
}) => {
  const statuses = ["To Do", "In Progress", "Done"];
  
  const sortTasks = arr =>
    [...arr].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statuses.map(status => (
        <TaskColumn
          key={status}
          status={status}
          tasks={sortTasks(tasks.filter(task => task.status === status))}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;