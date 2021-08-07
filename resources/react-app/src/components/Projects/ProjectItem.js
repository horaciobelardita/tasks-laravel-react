import React, { useContext } from 'react';
import { ProjectContext } from '../../context/projects/projectContext';
import { TaskContext } from '../../context/task/taskContext';

export const ProjectItem = ({ project }) => {
  const { selectProject } = useContext(ProjectContext);
  const { getTasks } = useContext(TaskContext);
  const handleSelectProject = () => {
    selectProject(project.id);
    getTasks(project.id);
  };
  return (
    <button
      onClick={handleSelectProject}
      className="btn btn-outline-info my-3 btn-block"
    >
      {project.name}
    </button>
  );
};
