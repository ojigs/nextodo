import { Music } from "lucide-react";
import TodoContainer from "@/app/components/todo/TodoContainer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-200 to-slate-100 text-slate-800 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2 font-mono">
            Structured Tasks
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-slate-300" />
            <Music className="text-slate-400 h-4 w-4" />
            <div className="h-px w-12 bg-slate-300" />
          </div>
        </div>
        <TodoContainer />
      </div>
    </div>
  );
}
