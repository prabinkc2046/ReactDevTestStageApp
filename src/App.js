import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [taskName, setTaskName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/login', // Use HTTPS
        {
          username: username,
          password: password,
        },
      );

      if (response.data.status === 'success') {
        setLoggedIn(true);
        alert('Login successful!');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/todos', 
        {
          task_name: taskName,
        },
        {
          withCredentials: true,
        }
        
      );

      if (response.data.status === 'success') {
        alert('Task added successfully!');
      } else {
        alert('Failed to add task.');
      }
    } catch (error) {
      console.error('Error during task addition:', error);
    }
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <h2>Add Task</h2>
          <label>
            Task Name:
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </label>
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
