import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import Toast from "../components/toast";
import { getTasks, createTask, updateTask, deleteTask as deleteTaskApi } from "../services/api";

const Dashboard = () => {
  const { currentUser, token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "info" });
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getTasks(token)
      .then(setTasks)
      .catch(() => showToast("Failed to load tasks", "error"))
      .finally(() => setLoading(false));
  }, [token]);

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "info" }), 2500);
  };

  const handleAddTask = async (taskData) => {
    if (!currentUser) {
      showToast("Please login or signup to add a task.", "error");
      return;
    }
    try {
      const newTask = await createTask(taskData, token);
      setTasks((prev) => [newTask, ...prev]);
      showToast("Task added!", "success");
    } catch {
      showToast("Failed to add task", "error");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updated = await updateTask(id, { status: newStatus }, token);
      setTasks((tasks) => tasks.map((task) => (task.id === id ? updated : task)));
      showToast("Task updated!", "info");
    } catch {
      showToast("Failed to update task", "error");
    }
  };

  const handleEdit = (task) => setEditTask(task);

  const handleDelete = async (id) => {
    try {
      await deleteTaskApi(id, token);
      setTasks((tasks) => tasks.filter((task) => task.id !== id));
      showToast("Task deleted!", "success");
    } catch {
      showToast("Failed to delete task", "error");
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateTask(editTask.id, editTask, token);
      setTasks((tasks) => tasks.map((task) => (task.id === editTask.id ? updated : task)));
      setEditTask(null);
      showToast("Task updated!", "success");
    } catch {
      showToast("Failed to update task", "error");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 transition-colors">
      <main className="max-w-6xl mx-auto py-10 px-2 sm:px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center tracking-tight drop-shadow">
            Welcome{currentUser ? `, ${currentUser.name}` : ""}!
          </h1>
          <p className="text-center text-gray-600 mb-2">
            Manage your tasks by status, priority, and due date—all in one place.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6  mb-8">
          <TaskForm onSubmit={handleAddTask} />
          <div className="pt-4">
            <TaskFilter filter={filter} setFilter={setFilter} />
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" aria-label="Loading"></div>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: "", type: "info" })}
        />
      )}
      {/* Edit Modal */}
      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" tabIndex={-1} onClick={() => setEditTask(null)}>
          <form
            className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full animate-fade-in border border-blue-100"
            onSubmit={handleUpdateTask}
            aria-modal="true"
            role="dialog"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Edit Task</h2>
            <input
              className="w-full border p-3 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              type="text"
              value={editTask.title}
              onChange={e => setEditTask({ ...editTask, title: e.target.value })}
              aria-label="Edit task title"
              autoFocus
              required
            />
            <input
              className="w-full border p-3 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              type="date"
              value={editTask.dueDate || ""}
              onChange={e => setEditTask({ ...editTask, dueDate: e.target.value })}
              aria-label="Edit due date"
            />
            <select
              className="w-full border p-3 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={editTask.priority}
              onChange={e => setEditTask({ ...editTask, priority: e.target.value })}
              aria-label="Edit priority"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input
              className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
              type="text"
              placeholder="Description"
              value={editTask.description || ""}
              onChange={e => setEditTask({ ...editTask, description: e.target.value })}
              aria-label="Edit description"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditTask(null)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
