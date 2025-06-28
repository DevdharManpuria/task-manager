import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setTasks(res.data);
    } catch {
      setError("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description, dueDate, priority },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
      fetchTasks();
    } catch {
      setError("Failed to add task");
    }
  };

  // Toggle complete
  const toggleComplete = async (id, completed) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/tasks/${id}`,
        { completed: !completed },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchTasks();
    } catch {
      setError("Failed to update task");
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchTasks();
    } catch {
      setError("Failed to delete task");
    }
  };

  // Sort tasks by dueDate (earliest first)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return a.dueDate ? -1 : b.dueDate ? 1 : 0;
  });
  
  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>My Tasks</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleAdd} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: 8, width: "25%", marginRight: 8 }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: 8, width: "25%", marginRight: 8 }}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ padding: 8, width: "20%", marginRight: 8 }}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ padding: 8, width: "15%", marginRight: 8 }}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit" style={{ padding: "8px 16px" }}>Add</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
  {sortedTasks.map((task) => {
    // Determine background based on priority
    let bg;
    if (task.priority === "High") bg = "lightcoral";
    else if (task.priority === "Medium") bg = "lightgoldenrodyellow";
    else bg = "lightgreen";

    return (
      <li
        key={task._id}
        style={{
          marginBottom: "0.5rem",
          display: "flex",
          alignItems: "center",
          background: bg,
          padding: "0.5rem",
          borderRadius: 4
        }}
      >
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task._id, task.completed)}
          style={{ marginRight: 8 }}
        />
        <div style={{ flexGrow: 1 }}>
          <strong>{task.title}</strong>
          <p style={{ margin: 0 }}>{task.description}</p>
          <small>
            Due:{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "—"}{" "}
            | Priority: {task.priority}
          </small>
        </div>
        <button
          onClick={() => handleDelete(task._id)}
          style={{ marginLeft: 8 }}
        >
          Delete
        </button>
      </li>
    );
  })}
</ul>

    </div>
  );
};

export default Home;
