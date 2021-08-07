import React, { useContext, useRef, useState } from 'react';
import { ProjectContext } from '../../context/projects/projectContext';

export const NewProject = () => {
  const [projectName, setProjectName] = useState('');
  const [errors, setErrors] = useState(null);
  const { newProject, showForm, hideForm, addProject } =
    useContext(ProjectContext);
  const inputNameRef = useRef(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!projectName.trim()) {
      setErrors('El nombre del proyecto es requerido');
      inputNameRef.current.focus();
      return;
    }
    addProject(projectName);
    setProjectName('');
    setErrors(null);
  };

  const handleNewProject = () => {
    newProject ? hideForm() : showForm();
  };

  return (
    <>
      <button className="btn btn-primary btn-block" onClick={handleNewProject}>
        Nuevo
      </button>
      {newProject && (
        <form className="mt-4" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <input
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              placeholder="Nombre del proyecto"
              ref={inputNameRef}
              className={`form-control ${errors ? 'is-invalid' : ''}`}
              type="text"
              name="name"
            />
          </div>
          <button className="btn btn-dark btn-block">Crear</button>
          {errors && <div className="alert alert-danger my-2">{errors}</div>}
        </form>
      )}
    </>
  );
};
