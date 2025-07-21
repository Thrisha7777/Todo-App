import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [taskDate, setTaskDate] = useState(new Date());
  const [editTaskId, setEditTaskId] = useState(null);

  // Load tasks from MongoDB
  useEffect(() => {
    fetch("http://localhost:5001/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const handleAddOrUpdateTask = async () => {
    if (!taskInput.trim()) return;

    const taskData = {
      title: taskInput,
      description: taskDate.toLocaleDateString(), // Store due date in description for now
    };

    try {
      if (editTaskId) {
        // Update task
        const res = await fetch(`http://localhost:5001/api/tasks/${editTaskId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        });
        const updated = await res.json();
        setTasks(prev => prev.map(t => (t._id === editTaskId ? updated : t)));
        setEditTaskId(null);
      } else {
        // Add task
        const res = await fetch("http://localhost:5001/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        });
        const newTask = await res.json();
        setTasks(prev => [...prev, newTask]);
      }
      setTaskInput('');
      setTaskDate(new Date());
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/tasks/${id}`, { method: "DELETE" });
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEditTask = (task) => {
    setTaskInput(task.title);
    setTaskDate(new Date(task.description));
    setEditTaskId(task._id);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>TASK BOARD</h2>
        <button className="logout-btn" onClick={() => window.location.href = '/'}>Logout</button>
      </div>

      <div className="task-input-section">
        <input
          type="text"
          placeholder={editTaskId ? "Update task title" : "Enter a task"}
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <DatePicker
          selected={taskDate}
          onChange={(date) => setTaskDate(date)}
          dateFormat="dd/MM/yyyy"
          className="date-picker"
        />
        <button onClick={handleAddOrUpdateTask}>
          {editTaskId ? "Update" : "Add"}
        </button>
      </div>

      <div className="task-list-section">
        <h3>Your Tasks</h3>
        {tasks.length === 0 ? (
          <p className="no-task">No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task-item">
              <div>
                <strong>{task.title}</strong>
                <p className="task-date">📅 {task.description}</p>
              </div>
             <div className="task-actions">
  <button 
    onClick={() => handleEdit(task)} 
    style={{ marginRight: "8px", padding: "6px 12px", background: "#f0ad4e", border: "none", color: "white", borderRadius: "5px" }}
  >
    Update
  </button>
  <button 
    onClick={() => handleDelete(task._id)} 
    style={{ padding: "6px 12px", background: "#d9534f", border: "none", color: "white", borderRadius: "5px" }}
  >
    Delete
  </button>
</div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
