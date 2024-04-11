import { useMutation, useQuery } from '@tanstack/react-query';
import { Group } from '../utils/types';
import api from '../utils/api';

export const useGroup = () => {
  return useQuery<Group[], Error, Group[]>({
    queryKey: ['groupInfos'],
    queryFn: () => api.getGroups(),
  });
};

export const useAddGroup = () => {
  return useMutation({
    mutationKey: ['addGroup'],
    mutationFn: api.postGroup,
  });
};
