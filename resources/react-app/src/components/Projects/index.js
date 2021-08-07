import React, { useContext, useEffect } from 'react';
import { ProjectContext } from '../../context/projects/projectContext';
import { Sidebar } from '../layout/Sidebar';
import { TaskForm } from '../tasks/TaskForm';
import { TaskList } from '../tasks/TaskList';
import { Nav } from './Nav';

export const Projects = () => {
  const { selectedProject } = useContext(ProjectContext);
  useEffect(() => {
    if (selectedProject) {
      document.title = `Proyecto: ${selectedProject.name}`;
    }
  }, [selectedProject]);
  return (
    <div className="container-fluid bg-secondary vh-100">
      <div className="row h-100">
        <Sidebar />
        <main className="col-md-8 p-0">
          <Nav />
          <TaskForm />
          <TaskList />
        </main>
      </div>
    </div>
  );
};
