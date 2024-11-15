"use client";

import { useState } from "react";
import { Task, FormValues } from "@/app/lib/definitions";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";
import { DropResult } from "@hello-pangea/dnd";

export default function TodoContainer() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const addTask = (data: FormValues) => {
    setTasks([
      {
        id: Date.now(),
        title: data.newTask,
        description: data.description || "",
        priority: data.priority,
        dueDate: data.dueDate ? new Date(data.dueDate).getTime() : null,
        completed: false,
        createdAt: Date.now(),
      },
      ...tasks,
    ]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
  };

  const saveEdit = (id: number, data: FormValues) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: data.title,
              description: data.description,
              priority: data.priority,
              dueDate: data.dueDate ? new Date(data.dueDate).getTime() : null,
            }
          : task
      )
    );
    setEditingId(null);
  };

  const handleReorderTasks = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    const reorderedTasks = Array.from(tasks);
    // Remove the task from its original position
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    // Insert the task at the new position
    reorderedTasks.splice(destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  const pendingTasks = tasks.filter((task) => !task.completed);
  // .sort((a, b) => b.createdAt - a.createdAt);

  const completedTasks = tasks.filter((task) => task.completed);
  // .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <>
      <AddTaskForm onAddTask={addTask} />
      <TaskList
        title="Pending Tasks"
        tasks={pendingTasks}
        editingId={editingId}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={startEditing}
        onSave={saveEdit}
        onCancelEdit={() => setEditingId(null)}
        onReorderTasks={handleReorderTasks}
      />
      {completedTasks.length > 0 && (
        <TaskList
          title="Completed"
          tasks={completedTasks}
          editingId={editingId}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={startEditing}
          onSave={saveEdit}
          onCancelEdit={() => setEditingId(null)}
          onReorderTasks={handleReorderTasks}
        />
      )}
    </>
  );
}
