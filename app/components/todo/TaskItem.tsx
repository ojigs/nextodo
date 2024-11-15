"use client";

import { Task, FormValues } from "@/app/lib/definitions";
import { useForm } from "react-hook-form";
import TaskDisplay from "./TaskDisplay";

interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  onSave: (id: number, data: FormValues) => void;
  onCancelEdit: () => void;
}

export default function TaskItem({
  task,
  isEditing,
  onToggle,
  onDelete,
  onEdit,
  onSave,
  onCancelEdit,
}: TaskItemProps) {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().slice(0, 10)
        : null,
    },
  });

  const onSubmit = (data: FormValues) => {
    onSave(task.id, data);
  };

  return (
    <div
      className={`group p-4 rounded-lg border transition-all duration-300
                ${
                  task.completed
                    ? "bg-slate-50 border-slate-200"
                    : "bg-white border-slate-200 hover:border-blue-200"
                }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="h-5 w-5 rounded border-slate-300
                   checked:bg-blue-500 transition-colors duration-200"
        />

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <label htmlFor="title" className="sr-only">
                  Task Title
                </label>
                <input
                  id="title"
                  {...register("title", { required: true })}
                  type="text"
                  placeholder="Title"
                  autoFocus
                  className="font-mono text-slate-800 focus:outline-none focus:border-blue-500 border-b border-slate-200 w-full mb-2"
                />
                <label htmlFor="description" className="sr-only">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  placeholder="Add description"
                  className="font-mono text-slate-800 focus:outline-none focus:border-blue-500 border-b border-slate-200 w-full mb-2 resize-none"
                />
                <div className="flex items-center gap-2 mb-2">
                  <label
                    htmlFor="taskpriority"
                    className="font-mono text-slate-600 text-sm"
                  >
                    Priority:
                  </label>
                  <select
                    id="taskpriority"
                    {...register("priority")}
                    className="font-mono text-slate-800 focus:outline-none focus:border-blue-500 border-b border-slate-200 w-full"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="dueDate"
                    className="font-mono text-slate-600 text-sm"
                  >
                    Due Date:
                  </label>
                  <input
                    id="dueDate"
                    {...register("dueDate")}
                    type="date"
                    className="font-mono text-slate-800 focus:outline-none focus:border-blue-500 border-b border-slate-200 w-full"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onCancelEdit}
                  className="text-slate-400 hover:text-slate-500 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <TaskDisplay task={task} onEdit={onEdit} onDelete={onDelete} />
        )}
      </div>
    </div>
  );
}
