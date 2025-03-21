import { updateTask } from "../../services/todoService";
import { toast } from "react-toastify";

const TaskItem = ({ task, onDelete, onStatusChange }) => {
  const handleCheckboxChange = async (e) => {
    const updatedStatus = e.target.checked;
    try {
      const updatedTask = await updateTask(task.taskId, {
        ...task,
        completed: updatedStatus,
      });
      onStatusChange(updatedTask);
      toast.success(`Task marked as ${updatedStatus ? "completed" : "in progress"}`);
    } catch (error) {
      console.error("Failed to update task status:", error);
      toast.error("Failed to update task status");
    }
  };

  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>
        <span
          className={`badge ${
            task.completed ? "bg-success" : "bg-warning text-dark"
          }`}
        >
          {task.completed ? "Completed" : "In Progress"}
        </span>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={task.completed}
            onChange={handleCheckboxChange}
          />
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(task.taskId)}
          >
            <i className="bi bi-trash"></i> Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TaskItem;
