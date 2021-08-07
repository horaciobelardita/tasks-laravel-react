import { useContext } from 'react';
import { ProjectContext } from './projectContext';

export const useProject = () => {
  return useContext(ProjectContext);
};
