import { useQuery } from 'react-query';

import { getProjectById, getProjects } from '@/api/projects';

// project id로 조회
export const useGetProjectById = (id: string) => {
  return useQuery(
    ['getProjectByid', id],
    async () => {
      const data = await getProjectById(id);
      return data;
    },
    {
      onError: (error: { message: string }) => {
        console.error(error.message);
      },
    },
  );
};

// project 전체 조회
export const useGetProjects = () => {
  return useQuery(
    ['getProjects'],
    async () => {
      const data = await getProjects();
      return data;
    },
    {
      onError: (error: { message: string }) => {
        console.error(error.message);
      },
    },
  );
};
