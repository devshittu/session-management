import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Session } from '@/types/serviceUser';

export type ActiveSessionsResponse = {
  sessions: Session[];
};

export const useActiveSessions = () => {
  return useQuery<ActiveSessionsResponse, Error>({
    queryKey: ['activeSessions'],
    queryFn: async () => {
      const { data } = await axios.get<ActiveSessionsResponse>(
        '/api/sessions/active',
      );
      return data;
    },
    refetchInterval: 10000, // Refetch every 10 seconds
  });
};
