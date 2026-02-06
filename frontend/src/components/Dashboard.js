import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/tasks', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(res.data);
        } catch (err) {
            console.error("Failed to fetch tasks");
        }
    };

    const addTask = async () => {
        if (!title) return;
        try {
            await axios.post('http://localhost:5000/api/v1/tasks', { title }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTitle('');
            fetchTasks();
        } catch (err) {
            alert("Failed to add task");
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (err) {
            alert("Not authorized to delete this task");
        }
    };

    useEffect(() => {
        if (token) fetchTasks();
        else window.location.href = '/login';
    }, []);

    return (
        <div className="dashboard-container">
            <div className="header">
                <div>
                    <h1>Task Management</h1>
                    <p>Role: <strong style={{color: '#4f46e5'}}>{role.toUpperCase()}</strong></p>
                </div>
                <button className="logout-btn" onClick={() => { localStorage.clear(); window.location.href='/login'; }}>
                    Logout
                </button>
            </div>

            <div className="auth-card" style={{maxWidth: '100%', marginBottom: '20px'}}>
                <h3>Create New Task</h3>
                <div style={{display: 'flex', gap: '10px'}}>
                    <input 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Enter task title..." 
                    />
                    <button onClick={addTask} style={{width: '150px'}}>Add Task</button>
                </div>
            </div>

            <div className="task-list">
                <h3>{role === 'admin' ? "All Users' Tasks" : "Your Tasks"}</h3>
                {tasks.length === 0 ? <p>No tasks found.</p> : tasks.map(t => (
                    <div key={t.id} className="task-card">
                        <div className="task-info">
                            <h4>{t.title}</h4>
                            <small>Created by User ID: {t.userId}</small>
                        </div>
                        <button className="delete-btn" onClick={() => deleteTask(t.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;