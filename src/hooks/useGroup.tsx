import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useUpdateGroup = () => {
  return useMutation({
    mutationKey: ['updateGroup'],
    mutationFn: api.updateGroup,
  });
};

export const useDeleteGroup = () => {
  return useMutation({
    mutationKey: ['deleteGroup'],
    mutationFn: api.deleteGroup,
  });
};

export const useResetDoneGroup = () => {
  return useMutation({
    mutationKey: ['resetDoneGroup'],
    mutationFn: api.resetDoneGroup,
  });
};

export const useInvalidateGroups = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: ['groupInfos'],
    });
};
