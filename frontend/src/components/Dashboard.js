import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../App.css';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const fetchTasks = useCallback(async () => {
        try {
            const res = await axios.get('https://task-manager-api-wkgn.onrender.com/api/v1/tasks', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(res.data);
        } catch (err) {
            console.error("Failed to fetch tasks");
        }
    }, [token]);

    const addTask = async () => {
        if (!title) return;
        try {
            await axios.post('https://task-manager-api-wkgn.onrender.com/api/v1/tasks', { title }, {
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
            await axios.delete(`https://task-manager-api-wkgn.onrender.com/api/v1/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (err) {
            alert("Not authorized to delete this task");
        }
    };

    useEffect(() => {
        if (token) {
            fetchTasks();
        } else {
            window.location.href = '/login';
        }
    }, [token, fetchTasks]); 

    return (
        <div className="dashboard-container">
            <div className="header">
                <div>
                    <h1>Task Manager</h1>
                    <p>Role: <strong>{role ? role.toUpperCase() : ''}</strong></p>
                </div>
                <button className="logout-btn" onClick={() => { localStorage.clear(); window.location.href='/login'; }}>
                    Logout
                </button>
            </div>

            <div className="auth-card" style={{maxWidth: '100%', marginBottom: '20px'}}>
                <h3>Add Task</h3>
                <div style={{display: 'flex', gap: '10px'}}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title..." />
                    <button onClick={addTask} style={{width: '150px'}}>Add</button>
                </div>
            </div>

            <h3>Tasks</h3>
            {tasks.map(t => (
                <div key={t.id} className="task-card">
                    <div className="task-info">
                        <h4>{t.title}</h4>
                        <small>Owner ID: {t.userId}</small>
                    </div>
                    <button className="delete-btn" onClick={() => deleteTask(t.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;