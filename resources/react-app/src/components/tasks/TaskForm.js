import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProjectContext } from '../../context/projects/projectContext';
import { TaskContext } from '../../context/task/taskContext';
const initialState = { name: '' };
export const TaskForm = () => {
  const { selectedProject } = useContext(ProjectContext);

  const { addTask, selectedTask, updateTask } = useContext(TaskContext);
  const [task, setTask] = useState(initialState);
  const [error, setError] = useState(null);
  const inputTaskref = useRef(null);
  useEffect(() => {
    if (!selectedTask) return;
    setTask(selectedTask);
    inputTaskref.current.focus();
    const timeout = setTimeout(() => {
      inputTaskref.current.select();
    }, 100);
    return () => clearTimeout(timeout);
  }, [selectedTask]);

  const handleAddTask = (event) => {
    event.preventDefault();
    if (!task.name.trim()) {
      setError('El nombre de la tarea es requerido');
      return;
    }
    setError(null);
    if (selectedTask) {
      updateTask(selectedProject.id, {
        ...selectedTask,
        ...task,
      });
    } else {
      addTask({
        ...task,
        done: false,
        project_id: selectedProject.id,
      });
    }
    setTask(initialState);
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  if (!selectedProject) return null;
  return (
    <div className="row mt-5">
      <div className="offset-md-2 col-md-8">
        <form onSubmit={handleAddTask}>
          <div className="form-group">
            <input
              type="text"
              ref={inputTaskref}
              className={`form-control ${error ? 'is-invalid' : ''}`}
              name="name"
              value={task.name}
              onChange={handleOnChange}
              placeholder="Nombre de la tarea"
            />
          </div>
          <button className="btn-block btn btn-dark">
            {selectedTask ? 'Editar' : 'Crear'} Tarea
          </button>
        </form>
        {error && <div className="alert mt-2 alert-danger">{error}</div>}
      </div>
    </div>
  );
};
