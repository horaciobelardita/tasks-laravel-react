import React, { useContext } from 'react';
import { ProjectContext } from '../../context/projects/projectContext';
import { TaskContext } from '../../context/task/taskContext';
import { Task } from './Task';

export const TaskList = () => {
  const { deleteProject, selectedProject } = useContext(ProjectContext);

  const { tasks } = useContext(TaskContext);

  const handleDeleteProject = () => {
    deleteProject(selectedProject.id);
  };

  if (!selectedProject)
    return <h2 className="text-center mt-3">Selecciona un proyecto</h2>;

  return (
    <div className="bg-white  m-3 p-3 rounded">
      <h4 className="text-center">Tarea: {selectedProject.name}</h4>
      <ul className="list-group">
        {tasks.length === 0 ? (
          <li className="list-group-item">No hay Tareas</li>
        ) : (
          tasks.map((task) => <Task key={task.id} task={task} />)
        )}
      </ul>
      <button onClick={handleDeleteProject} className="btn btn-danger mt-2">
        Eliminar Proyecto &times;
      </button>
    </div>
  );
};
