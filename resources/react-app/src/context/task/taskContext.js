import React from 'react';
import { createContext, useReducer } from 'react';
import api from '../../config/axios';
import taskReducer from './taskReducer';

export const TaskContext = createContext();
const initialState = {
  tasks: [],
  selectedTask: null,
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const getTasks = (projectId) => {
    api.get(`/projects/${projectId}/tasks`).then(({ data: { data } }) => {
      dispatch({
        type: 'FETCH_TASKS',
        payload: data,
      });
    });
  };
  const addTask = (task) => {
    api
      .post(`/projects/${task.project_id}/tasks`, task)
      .then(({ data: { data } }) => {
        dispatch({
          type: 'ADDED_TASK',
          payload: data.task,
        });
      });
  };
  const deleteTask = (project_id, taskId) => {
    api.delete(`/projects/${project_id}/tasks/${taskId}`).then(() => {
      dispatch({
        type: 'DELETED_TASK',
        payload: taskId,
      });
    });
  };
  const selectTask = (task) => {
    dispatch({
      type: 'SELECTED_TASK',
      payload: task,
    });
  };

  const toggleTaskStatus = (project_id, task) => {
    api.put(`/projects/${project_id}/tasks/${task.id}`, task).then(() => {
      dispatch({
        type: 'TOGGLE_DONE_TASK',
        payload: task.id,
      });
    });
  };
  const updateTask = (project_id, task) => {
    api
      .put(`/projects/${project_id}/tasks/${task.id}`, task)
      .then(({ data: { data } }) => {
        dispatch({
          type: 'UPDATED_TASK',
          payload: data.task,
        });
      });
  };

  return (
    <TaskContext.Provider
      value={{
        ...state,
        getTasks,
        addTask,
        deleteTask,
        toggleTaskStatus,
        selectTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
