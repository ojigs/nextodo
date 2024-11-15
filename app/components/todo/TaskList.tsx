import { Task, FormValues } from "@/app/lib/definitions";
import TaskItem from "./TaskItem";

interface TaskListProps {
  title: string;
  tasks: Task[];
  editingId: number | null;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  onSave: (id: number, data: FormValues) => void;
  onCancelEdit: () => void;
}

export default function TaskList({
  title,
  tasks,
  editingId,
  onToggle,
  onDelete,
  onEdit,
  onSave,
  onCancelEdit,
}: TaskListProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-mono font-semibold text-slate-700">
          {title}
        </h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            isEditing={editingId === task.id}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onSave={onSave}
            onCancelEdit={onCancelEdit}
          />
        ))}
      </div>
    </div>
  );
}
