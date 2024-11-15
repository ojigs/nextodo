import { Task, FormValues } from "@/app/lib/definitions";
import TaskItem from "./TaskItem";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

interface TaskListProps {
  title: string;
  tasks: Task[];
  editingId: number | null;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  onSave: (id: number, data: FormValues) => void;
  onCancelEdit: () => void;
  onReorderTasks: (result: DropResult) => void;
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
  onReorderTasks,
}: TaskListProps) {
  const isCompletedTask = title === "Completed";
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-mono font-semibold text-slate-700">
          {title}
        </h2>
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded ${
            isCompletedTask
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {tasks.length}
        </span>
      </div>
      <DragDropContext onDragEnd={onReorderTasks}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <div
              className="space-y-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task) => (
                <Draggable
                  draggableId={String(task.id)}
                  key={task.id}
                  index={tasks.indexOf(task)}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskItem
                        key={task.id}
                        task={task}
                        isEditing={editingId === task.id}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onSave={onSave}
                        onCancelEdit={onCancelEdit}
                        provided={provided}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
