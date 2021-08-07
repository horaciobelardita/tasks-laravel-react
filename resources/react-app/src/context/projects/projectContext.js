import React from 'react';
import { createContext, useReducer } from 'react';
import { toast } from 'react-toastify';
import api from '../../config/axios';
import projectReducer from './projectReducer';

export const ProjectContext = createContext();
const initialState = {
  newProject: false,
  projects: [],
  selectedProject: null,
};

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);
  const showForm = () =>
    dispatch({
      type: 'SHOW_FORM',
    });
  const hideForm = () =>
    dispatch({
      type: 'HIDE_FORM',
    });
  const getProjects = () =>
    api.get('/projects').then(({ data }) => {
      dispatch({
        type: 'PROJECTS_FETCHED',
        payload: data.projects,
      });
    });
  const addProject = (name) => {
    api.post('/projects', { name }).then(({ data }) => {
      dispatch({
        type: 'ADD_PROJECT',
        payload: data.project,
      });
    });
  };
  const selectProject = (projectId) => {
    dispatch({
      type: 'SELECTED_PROJECT',
      payload: projectId,
    });
  };
  const deleteProject = (projectId) => {
    api
      .delete(`/projects/${projectId}`)
      .then(() => {
        dispatch({
          type: 'PROJECT_DELETED',
          payload: projectId,
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <ProjectContext.Provider
      value={{
        ...state,
        showForm,
        hideForm,
        getProjects,
        addProject,
        selectProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
