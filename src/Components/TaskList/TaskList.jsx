import React, { useState, useEffect, forceUpdate } from "react";
import TaskItem from "../TaskItem/TaskItem";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import "./TaskList.css";

const TaskList = ({ tasks, onComplete, onDelete }) => {
  const [completed, setCompleted] = useState(false);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const [orderedTasks, setOrderedTasks] = useState(tasks);

  useEffect(() => {
    setOrderedTasks(tasks);
  }, [tasks]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id && over.id) {
      const oldIndex = orderedTasks.findIndex(
        (task) => `draggable-${task.id}` === active.id
      );
      const newIndex = orderedTasks.findIndex(
        (task) => `draggable-${task.id}` === over.id
      );

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const updatedTasks = arrayMove(orderedTasks, oldIndex, newIndex);
        setOrderedTasks(updatedTasks);
      }
    }
  };
  // const handleComplete = (taskId) => {
  //   const updatedTasks = orderedTasks.map((task) =>
  //     task.id === taskId ? { ...task, completed: !task.completed } : task
  //   );

  //   setOrderedTasks(updatedTasks);
  //   localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  //   onComplete(taskId);
  // };

  // const handleDelete = (taskId) => {
  //   const updatedTasks = orderedTasks.filter((task) => task.id !== taskId);

  //   setOrderedTasks(updatedTasks);
  //   localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  //   onComplete(taskId);
  // };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={orderedTasks.map((task) => `draggable-${task.id}`)}
      >
        <div className="lista__tareas">
          {orderedTasks.map((task) => {
            if (task) {
              return (
                <TaskItem
                  className="tarea"
                  key={task.id}
                  task={task}
                  onComplete={onComplete}
                  onDelete={onDelete}
                />
              );
            }
            return null;
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TaskList;
