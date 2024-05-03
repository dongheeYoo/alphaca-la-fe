import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useGameContents = () => {
  return useQuery({
    queryKey: ['gameContentsInfo'],
    queryFn: api.getGameContentsInfo,
    select: (d: any) => {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1 < 10 ? '0' : '') + (today.getMonth() + 1);
      const day = (today.getDate() < 10 ? '0' : '') + today.getDate();
      const formattedToday = `${year}-${month}-${day}`;
      return d.filter((d: any) => {
        return d.StartTimes?.some((startTime: string) => {
          const startTimeDate = new Date(startTime).toISOString().split('T')[0];
          return startTimeDate === formattedToday;
        });
      });
    },
  });
};
