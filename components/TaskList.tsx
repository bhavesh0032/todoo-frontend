import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

interface Task {
  id: number;
  title: string;
  status: string;
}

interface TaskListProps {
  tasks: Task[];
  status: string;
  moveTask: (id: number, status: string) => void;
  deleteTask: (id: number) => void;
  title: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, status, moveTask, deleteTask, title }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`bg-white p-4 rounded-lg shadow-lg min-h-[300px] ${isOver ? 'border-2 border-dashed border-gray-400' : ''}`}
    >
      <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            moveTask={moveTask}
            deleteTask={deleteTask}
            status={status}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;