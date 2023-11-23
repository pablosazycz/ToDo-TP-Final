import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./TaskForm.css";

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskName.trim() !== "") {
      onAddTask(taskName);
      setTaskName("");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Ingrese una Tarea"
          variant="standard"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <IconButton color="primary" type="submit" onClick={handleSubmit}>
          <AddCircleIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </form>
    </div>
  );
};

export default TaskForm;
