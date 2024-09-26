import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addTask, completeTask, deleteTask, getTasks, updateTask } from '../services/api';

const Tasks = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const navigate = useNavigate();

    const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.info('You are not logged in. Please sign up or log in to see your tasks.');
            return;
        }
        try {
            const response = await getTasks(token);
            setTasks(response.data);
        } catch {
            toast.error('Failed to fetch tasks. Please try again.');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error('Task title cannot be empty.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You are not logged in.');
            navigate('/login');
            return;
        }

        try {
            if (isEditing) {
                const { data: updatedTask } = await updateTask(currentTaskId, { title, description }, token);
                setTasks(prevTasks => prevTasks.map(task => task._id.toString() === currentTaskId.toString() ? updatedTask : task));
                toast.success('Task updated successfully!');
            } else {
                const { data: { task } } = await addTask({ title, description }, token);
                setTasks(prevTasks => [...prevTasks, task]);
                toast.success('Task added successfully!');
            }
            setTitle('');
            setDescription('');
            setIsEditing(false);
            setCurrentTaskId(null);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Session expired. Please log in again.');
                navigate('/login');
            } else {
                toast.error('Failed to delete task. Please try again.');
            }
        }
    };

    const handleDeleteTask = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await deleteTask(id, token);
            if (response.status === 200) {
                setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
                toast.success('Task deleted successfully!');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Session expired. Please log in again.');
                navigate('/login');
            } else {
                toast.error('Failed to delete task. Please try again.');
            }
        }
    };

    const handleEditTask = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setCurrentTaskId(task._id);
        setIsEditing(true);
    };

    const handleToggleCompletion = async (id, completed) => {
        const token = localStorage.getItem('token');
        try {
            const response = await completeTask(id, token, { completed: !completed });
            if (response.status === 200) {
                setTasks(prevTasks => prevTasks.map(task => task._id === id ? { ...task, completed: !completed } : task));
                toast.success('Task status updated successfully!');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Session expired. Please log in again.');
                navigate('/login');
            } else {
                toast.error('Failed to delete task. Please try again.');
            }
        }
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 p-6 space-y-6">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        {isEditing ? 'Edit Task' : 'Task Manager'}
                    </h1>
                    <form className="space-y-4" onSubmit={handleTaskSubmit}>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Task description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            {isEditing ? 'Update Task' : 'Add Task'}
                        </button>
                    </form>

                    <ul className="mt-4 space-y-2">
                        {tasks.map((task) => (
                            <li key={task._id} className="flex justify-between items-center bg-gray-100 rounded-lg p-2">
                                <div>
                                    <h2 className="font-bold">{task.title}</h2>
                                    <p>{task.description}</p>
                                    <button
                                        className={`mt-1 underline ${task.completed ? 'text-green-600' : 'text-gray-600'}`}
                                        onClick={() => handleToggleCompletion(task._id, task.completed)}
                                    >
                                        {task.completed ? 'Completed' : 'Mark as Complete'}
                                    </button>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleEditTask(task)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <ToastContainer />
        </>
    );
};

export default Tasks;
