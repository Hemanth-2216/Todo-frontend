import { useState, useEffect } from "react";
import { addTask, updateTask } from "../../services/todoService";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

const AddTask = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCompleted(task.completed);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, completed };

    try {
      if (task) {
        await updateTask(task.taskId, taskData);
        toast.success("Task updated successfully!");
      } else {
        await addTask(taskData);
        toast.success("Task added successfully!");
      }
      onSave();
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Error saving task.");
    }
  };

  // ✅ Custom style objects for inline styles
  const cardHeaderStyle = {
    background: "linear-gradient(90deg, #4e54c8, #8f94fb)",
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
  };

  const cardStyle = {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    border: "none",
  };

  const formControlFocus = {
    transition: "box-shadow 0.3s, border-color 0.3s",
  };

  return (
    <div className="container mt-5">
      <div className="card" style={cardStyle}>
        <div style={cardHeaderStyle}>
          <i className="bi bi-pencil-square fs-4 me-2"></i>
          <h4 className="mb-0">{task ? "Edit Task" : "Add New Task"}</h4>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                style={formControlFocus}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                style={formControlFocus}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the task"
                required
              />
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                id="completedCheckbox"
              />
              <label className="form-check-label ms-2" htmlFor="completedCheckbox">
                Mark as completed
              </label>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-outline-secondary me-3 px-4"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success px-4">
                {task ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
