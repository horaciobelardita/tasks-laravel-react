import React, { useEffect } from 'react';
import { useProject } from '../../context/projects/useProject';
import { ProjectItem } from './ProjectItem';

export const ProjectList = () => {
  const { projects, getProjects } = useProject();

  useEffect(() => {
    getProjects();
  }, []);

  if (projects.length === 0)
    return <p className="mt-4">No hay proyectos, comienza creando uno</p>;
  return (
    <>
      <h3 className="mt-4">Tus Proyectos ({projects.length})</h3>
      <div>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};
