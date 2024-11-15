"use client";

import { FormValues } from "@/app/lib/definitions";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";

interface AddTaskFormProps {
  onAddTask: (data: FormValues) => void;
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      newTask: "",
      title: "",
      description: "",
      priority: "medium",
      dueDate: null,
    },
  });

  const onSubmit = (data: FormValues) => {
    if (data.newTask.trim()) {
      onAddTask(data);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
      <div className="flex gap-2 flex-wrap">
        <label htmlFor="newTask" className="sr-only">
          Add a new task
        </label>
        <input
          id="newTask"
          {...register("newTask", { required: true })}
          type="text"
          className="flex-1 px-4 py-2 rounded-md border border-slate-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-transparent font-mono"
          placeholder="Add a new task..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md
                   hover:bg-blue-600 transition-colors duration-200
                   flex items-center gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          Add
        </button>
      </div>
    </form>
  );
}
