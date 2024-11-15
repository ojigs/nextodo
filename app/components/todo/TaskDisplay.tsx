"use client";

import { Task } from "@/app/lib/definitions";
import {
  CalendarDays,
  FilePlus,
  Pencil,
  Trash2,
  AlertCircle,
} from "lucide-react";
import dayjs from "dayjs";
import { useState } from "react";

interface TaskDisplayProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

// Priority badge component
const PriorityBadge = ({ priority }: { priority: Task["priority"] }) => {
  const priorityStyles = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div
      className={`px-2 py-1 rounded-full text-xs font-mono ${priorityStyles[priority]}`}
    >
      {priority}
    </div>
  );
};

// Task metadata for due date and description indicator
const TaskMetadata = ({ task }: { task: Task }) => {
  const isOverdue =
    task.dueDate && new Date(task.dueDate).getTime() < Date.now();

  return (
    <div className="flex items-center gap-3">
      {task.dueDate && (
        <div
          className={`flex items-center gap-1 font-mono text-sm
          ${isOverdue ? "text-red-600" : "text-slate-600"}`}
        >
          {isOverdue ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <CalendarDays className="h-4 w-4" />
          )}
          <span>{dayjs(task.dueDate).format("MMM D, YYYY")}</span>
        </div>
      )}
      {task.description && (
        <div className="flex items-center gap-1 font-mono text-sm text-slate-600 group relative">
          <FilePlus className="h-4 w-4" />
          <span>Note</span>
          {/* Description tooltip */}
          <div
            className="absolute bottom-full left-0 mb-2 hidden group-hover:block 
                        bg-white p-2 rounded shadow-lg border border-slate-200 
                        max-w-xs whitespace-normal z-10"
          >
            {task.description}
          </div>
        </div>
      )}
      <div className="text-xs text-slate-500">
        Created {dayjs(task.createdAt).format("MMM D")}
      </div>
    </div>
  );
};

// Task actions component to edit and delete tasks
const TaskActions = ({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(task.id);
    } else {
      setShowDeleteConfirm(true);
      // Confirmation resets after 3 seconds
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <div className="flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
      <button
        onClick={() => onEdit(task)}
        className="text-slate-400 hover:text-blue-500 transition-colors duration-200
                 p-1 rounded hover:bg-blue-50"
        title="Edit task"
      >
        <Pencil className="h-5 w-5" />
      </button>
      <button
        onClick={handleDelete}
        className={`transition-colors duration-200 p-1 rounded
                  ${
                    showDeleteConfirm
                      ? "text-red-500 bg-red-50"
                      : "text-slate-400 hover:text-red-500 hover:bg-red-50"
                  }`}
        title={
          showDeleteConfirm ? "Click again to confirm deletion" : "Delete task"
        }
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default function TaskDisplay({
  task,
  onEdit,
  onDelete,
}: TaskDisplayProps) {
  return (
    <div className="flex-1">
      {/* Title and Priority Section */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 flex-1">
          <span
            onClick={() => onEdit(task)}
            className={`flex-1 font-mono cursor-pointer
                      ${
                        task.completed
                          ? "text-slate-500 line-through"
                          : "text-slate-800 hover:text-blue-600"
                      }`}
          >
            {task.title}
          </span>
        </div>
        <PriorityBadge priority={task.priority} />
      </div>

      {/* Metadata and Actions Section */}
      <div className="mt-4 flex items-center justify-between">
        <TaskMetadata task={task} />
        <TaskActions task={task} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}
