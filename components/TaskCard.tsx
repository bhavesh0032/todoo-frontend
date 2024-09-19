import React from 'react';
import { useDrag } from 'react-dnd';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Task {
  id: number;
  title: string;
  status: string;
}

interface TaskCardProps {
  task: Task;
  moveTask: (id: number, status: string) => void;
  deleteTask: (id: number) => void;
  status: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, moveTask, deleteTask, status }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getBackgroundColor = () => {
    switch (status) {
      case 'todo':
        return 'bg-red-200';
      case 'in_progress':
        return 'bg-yellow-200';
      case 'done':
        return 'bg-green-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div
    // @ts-ignore
      ref={drag}
      className={`p-2 mb-2 rounded shadow-md ${getBackgroundColor()} ${
        isDragging ? 'opacity-50' : ''
      } flex justify-between items-center cursor-move`}
    >
      <span className="text-sm">{task.title}</span>
      {status === 'done' && (
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default TaskCard;