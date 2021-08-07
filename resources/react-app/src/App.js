import React from 'react';
import './App.css';
import { AuthProvider } from './context/auth/authContext';
import { ProjectProvider } from './context/projects/projectContext';
import { TaskProvider } from './context/task/taskContext';
import { AlertProvider } from './context/alerts/alertContext';
import { AppRouter } from './routers/AppRouter';

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <TaskProvider>
          <AlertProvider>
            <AppRouter />
          </AlertProvider>
        </TaskProvider>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
