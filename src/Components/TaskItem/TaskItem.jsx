// TaskItem.js
import React from "react";
import "./TaskItem.css";
import { IconButton } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from "@mui/material/Tooltip";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { useEffect } from "react";

const TaskItem = ({ task, onComplete, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: `draggable-${task.id}`,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={`tarea ${task.completed ? "completed" : ""}`}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
    >
      <div>{task.name}</div>

      <div style={{ marginLeft: "auto" }}>
        <Tooltip title="Completar Tarea" arrow>
          <IconButton
            className="completar__tarea"
            onClick={() => onComplete(task.id)}
          >
            <CheckCircleOutlineIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Eliminar Tarea" arrow>
          <IconButton
            className="borrar__tarea"
            onClick={() => onDelete(task.id)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default TaskItem;
