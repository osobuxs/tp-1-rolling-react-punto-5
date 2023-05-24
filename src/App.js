import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const addTask = () => {
    if (task.length >= 3 && task.length <= 400) {
      setTaskList([...taskList, task]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);
  };

  return (
    <div className="app-container">
      <h1>Bienvenido</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Ingresar una tarea"
          value={task}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTask}>Agregar</button>
      </div>
      <div className="task-list">
        {taskList.map((item, index) => (
          <div className="task-item" key={index}>
            {item}
            <span className="delete-icon" onClick={() => deleteTask(index)}>
              X
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
