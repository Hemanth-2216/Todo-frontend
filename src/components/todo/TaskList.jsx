import { useEffect, useState } from "react";
import { getAllTasks, deleteTask, updateTaskStatus } from "../../services/todoService";
import AddTask from "./AddTask";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const fetchTasks = async () => {
    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const tasks = await getAllTasks();

      if (Array.isArray(tasks)) {
        setTasks(tasks);
      } else {
        setTasks([]); // Ensure state is not undefined
      }

      setLoading(false);
    } catch (err) {
      setError("Failed to load tasks.");
      setTasks([]); // Ensure state is reset on failure
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddClick = () => {
    setSelectedTask(null);
    setShowAddTask(true);
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowAddTask(true);
  };

  const handleDeleteClick = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
        toast.success("Task deleted successfully!");
        setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
      } catch (err) {
        toast.error("Failed to delete task.");
      }
    }
  };

  const handleSave = () => {
    setShowAddTask(false);
    fetchTasks();
  };

  const handleCancel = () => {
    setShowAddTask(false);
  };

  const handleStatusChange = async (task) => {
    try {
      setUpdatingTaskId(task.taskId);
      
      // **Fix: Update only the status of the task instead of refetching**
      const updatedTasks = tasks.map((t) =>
        t.taskId === task.taskId ? { ...t, completed: !t.completed } : t
      );

      setTasks(updatedTasks); // Update UI immediately

      await updateTaskStatus(task.taskId, !task.completed);
      toast.success("Task status updated!");
    } catch (err) {
      toast.error("Failed to update status.");
    } finally {
      setUpdatingTaskId(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Tasks</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {!showAddTask && (
        <>
          <button className="btn btn-primary mb-3" onClick={handleAddClick}>
            Add Task
          </button>

          {loading ? (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : tasks.length === 0 ? (
            <div className="border p-3 text-center text-muted" style={{ backgroundColor: "#f8f9fa" }}>
              No tasks found.
            </div>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.taskId}>
                    <td>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleStatusChange(task)}
                        disabled={updatingTaskId === task.taskId}
                        className="form-check-input"
                      />
                    </td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                      <span
                        className={`badge ${task.completed ? "bg-success" : "bg-warning text-dark"}`}
                      >
                        {task.completed ? "Completed" : "In Progress"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => handleEditClick(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteClick(task.taskId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
      {showAddTask && (
        <AddTask task={selectedTask} onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default TaskList;
