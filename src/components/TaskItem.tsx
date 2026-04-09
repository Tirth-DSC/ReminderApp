import { Check, ChevronRight, MoreVertical, Clock, Tag, Bell, Circle } from 'lucide-react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  variant?: 'default' | 'history' | 'compact';
  key?: string | number;
}

export default function TaskItem({ task, onToggle, variant = 'default' }: TaskItemProps) {
  if (variant === 'history') {
    return (
      <div className="group relative flex items-center justify-between p-5 bg-surface-container-lowest rounded-xl hover:shadow-[0_8px_30px_rgba(35,44,81,0.04)] transition-all duration-300">
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-low text-primary">
            <Check className="w-6 h-6" strokeWidth={3} />
          </div>
          <div>
            <h4 className="text-lg font-bold line-through text-on-surface/40 decoration-on-surface/20">
              {task.title}
            </h4>
            <p className="flex items-center gap-2 mt-1 text-xs font-bold uppercase tracking-wider text-secondary">
              Completed {task.completedAt}
              {task.category === 'Strategy' && <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-surface-container-lowest p-6 rounded-2xl flex items-center gap-5 group hover:shadow-[0_4px_20px_rgba(35,44,81,0.04)] transition-all">
        <button 
          onClick={() => onToggle(task.id)}
          className="flex items-center justify-center w-6 h-6 transition-colors border-2 rounded-full border-outline-variant group-hover:border-primary"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-bold text-on-surface">{task.title}</p>
            {task.priority && <span className="w-2 h-2 rounded-full bg-tertiary" />}
          </div>
          <p className="mt-1 text-sm text-on-surface-variant">
            {task.time} • {task.category}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-outline-variant" />
      </div>
    );
  }

  return (
    <div className={`bg-surface-container-lowest rounded-2xl p-6 flex items-start gap-5 shadow-[0_12px_40px_rgba(35,44,81,0.04)] relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(35,44,81,0.08)] transition-all duration-300 ${task.completed ? 'opacity-60' : ''}`}>
      {task.priority && <div className="absolute top-0 bottom-0 left-0 w-1 bg-tertiary" />}
      
      <div className="mt-1">
        <button 
          onClick={() => onToggle(task.id)}
          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
            task.completed ? 'bg-primary border-primary' : 'border-outline-variant hover:border-primary'
          }`}
        >
          {task.completed && <Check className="w-4 h-4 text-white" strokeWidth={4} />}
        </button>
      </div>

      <div className="flex flex-col flex-1 gap-1">
        <div className="flex justify-between items-start">
          <h3 className={`font-headline text-lg font-bold text-on-surface leading-tight ${task.completed ? 'line-through' : ''}`}>
            {task.title}
          </h3>
          <button className="transition-colors text-outline-variant hover:text-on-surface">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
        
        {task.description && (
          <p className="mb-3 text-sm leading-relaxed font-body text-secondary">
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-4">
          {task.time && (
            <div className={`flex items-center gap-1 ${task.priority ? 'text-tertiary' : 'text-primary'}`}>
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs font-bold uppercase tracking-wider font-label">
                {task.time} {task.date || 'Today'}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1 text-outline">
            <Tag className="w-3.5 h-3.5" />
            <span className="text-xs font-bold uppercase tracking-wider font-label">
              {task.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
