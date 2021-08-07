import React, { useContext } from 'react';
import { useProject } from '../../context/projects/useProject';
import { TaskContext } from '../../context/task/taskContext';

export const Task = ({ task }) => {
  const { deleteTask, toggleTaskStatus, selectTask } = useContext(TaskContext);
  const { selectedProject } = useProject();

  const cssClasses =
    'mr-2 badge badge-pill badge-' + (task.done ? 'success' : 'warning');
  const text = task.done ? 'completo' : 'incompleto';
  return (
    <li className="list-group-item d-flex justify-content-between">
      {task.name}
      <div>
        <span
          className={cssClasses}
          onClick={() =>
            toggleTaskStatus(selectedProject.id, {
              id: task.id,
              done: !task.done,
            })
          }
        >
          {text}
        </span>
        <button
          className="btn mr-2 btn-warning"
          onClick={() => selectTask(task)}
        >
          editar
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            if (window.confirm('Are you sure?')) {
              deleteTask(selectedProject.id, task.id);
            }
          }}
        >
          eliminar
        </button>
      </div>
    </li>
  );
};
