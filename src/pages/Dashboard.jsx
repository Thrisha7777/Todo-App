import { useState } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please fill in both title and description");
      return;
    }
    const newTask = {
      id: Date.now(),
      title,
      description,
      status: "pending",
    };
    setTasks([newTask, ...tasks]);
    setTitle("");
    setDescription("");
  };

  const handleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: "completed" } : task
    );
    setTasks(updatedTasks);
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h2>📋 Task Manager</h2>
      <form onSubmit={handleAddTask} style={formStyle}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={addBtn}>➕ Add Task</button>
      </form>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} style={cardStyle}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              Status:{" "}
              <strong style={{ color: task.status === "completed" ? "green" : task.status === "in-progress" ? "orange" : "red" }}>
                {task.status}
              </strong>
            </p>
            {task.status !== "completed" && (
              <button onClick={() => handleComplete(task.id)}>✔️ Complete</button>
            )}
            <button
              onClick={() => handleDelete(task.id)}
              style={{
                marginLeft: "10px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              🗑️ Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const formStyle = {
  marginBottom: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  maxWidth: "400px",
};
const inputStyle = {
  padding: "8px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};
const addBtn = {
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
};
const cardStyle = {
  backgroundColor: "#f9f9f9",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "16px",
  textAlign: "left",
};

export default Dashboard;
