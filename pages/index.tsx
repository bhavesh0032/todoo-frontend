import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import TaskList from '../components/TaskList';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks`;

interface Task {
  id: number;
  title: string;
  status: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      try {
        const response = await axios.post<Task>(API_URL, {
          title: newTaskTitle,
          status: 'todo',
        });
        setTasks(prevTasks => [...prevTasks, response.data]);
        setNewTaskTitle('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const moveTask = async (id: number, newStatus: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, status: newStatus } : task
      )
    );

    try {
      await axios.put<Task>(`${API_URL}/${id}`, { status: newStatus });
    } catch (error) {
      console.error('Error moving task:', error);
      // Revert the state if the API call fails
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === id ? { ...task, status: task.status } : task
        )
      );
    }
  };

  const deleteTask = async (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));

    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      // Revert the state if the API call fails
      fetchTasks();
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Todo List</h1>
        <form onSubmit={addTask} className="mb-8 flex justify-center">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task"
            className="border-2 border-blue-300 p-2 rounded-l-lg w-64 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
          >
            Add Task
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskList
            tasks={tasks.filter((t) => t.status === 'todo')}
            status="todo"
            moveTask={moveTask}
            deleteTask={deleteTask}
            title="To Do"
          />
          <TaskList
            tasks={tasks.filter((t) => t.status === 'in_progress')}
            status="in_progress"
            moveTask={moveTask}
            deleteTask={deleteTask}
            title="In Progress"
          />
          <TaskList
            tasks={tasks.filter((t) => t.status === 'done')}
            status="done"
            moveTask={moveTask}
            deleteTask={deleteTask}
            title="Done"
          />
        </div>
      </div>
    </DndProvider>
  );
}

// import React, { useState, useEffect } from 'react';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import axios from 'axios';
// import TaskList from '../components/TaskList';

// const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks`;

// interface Task {
//   id: number;
//   title: string;
//   status: string;
// }

// export default function Home() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [newTaskTitle, setNewTaskTitle] = useState('');

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get<Task[]>(API_URL);
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const addTask = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newTaskTitle.trim()) {
//       try {
//         const response = await axios.post<Task>(API_URL, {
//           title: newTaskTitle,
//           status: 'todo',
//         });
//         setTasks([...tasks, response.data]);
//         setNewTaskTitle('');
//       } catch (error) {
//         console.error('Error adding task:', error);
//       }
//     }
//   };

//   const moveTask = async (id: number, newStatus: string) => {
//     try {
//       const response = await axios.put<Task>(`${API_URL}/${id}`, { status: newStatus });
//       setTasks(tasks.map((t) => (t.id === id ? response.data : t)));
//     } catch (error) {
//       console.error('Error moving task:', error);
//     }
//   };

//   const deleteTask = async (id: number) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setTasks(tasks.filter((t) => t.id !== id));
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
//         <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Todo List</h1>
//         <form onSubmit={addTask} className="mb-8 flex justify-center">
//           <input
//             type="text"
//             value={newTaskTitle}
//             onChange={(e) => setNewTaskTitle(e.target.value)}
//             placeholder="Add a new task"
//             className="border-2 border-blue-300 p-2 rounded-l-lg w-64 focus:outline-none focus:border-blue-500"
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
//           >
//             Add Task
//           </button>
//         </form>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <TaskList
//             tasks={tasks.filter((t) => t.status === 'todo')}
//             status="todo"
//             moveTask={moveTask}
//             deleteTask={deleteTask}
//             color="bg-yellow-200"
//             title="To Do"
//           />
//           <TaskList
//             tasks={tasks.filter((t) => t.status === 'in_progress')}
//             status="in_progress"
//             moveTask={moveTask}
//             deleteTask={deleteTask}
//             color="bg-blue-200"
//             title="In Progress"
//           />
//           <TaskList
//             tasks={tasks.filter((t) => t.status === 'done')}
//             status="done"
//             moveTask={moveTask}
//             deleteTask={deleteTask}
//             color="bg-green-200"
//             title="Done"
//           />
//         </div>
//       </div>
//     </DndProvider>
//   );
// }