// import { useInfiniteQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { Session } from '@/types/serviceUser';

// type SessionsResponse = {
//   sessions: Session[];
//   total: number;
//   page: number;
//   pageSize: number;
// };

// type FetchSessionsParams = {
//   sortBy: string;
//   order: 'asc' | 'desc';
// };

// const fetchSessions = async ({ pageParam = 1, queryKey }: any): Promise<SessionsResponse> => {
//   const [, { sortBy, order }] = queryKey;
//   const { data } = await axios.get<SessionsResponse>(`/api/sessions?page=${pageParam}&pageSize=20&sortBy=${sortBy}&order=${order}`);
//   return data;
// };

// export const useSessions = ({ sortBy, order }: FetchSessionsParams) =>
//   useInfiniteQuery<SessionsResponse, Error>({
//     queryKey: ['sessions', { sortBy, order }],
//     queryFn: fetchSessions,
//     getNextPageParam: (lastPage) => {
//       const { page, pageSize, total } = lastPage;
//       const maxPage = Math.ceil(total / pageSize);
//       return page < maxPage ? page + 1 : undefined;
//     },
//   });

import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Session } from '@/types/serviceUser';

type SessionsResponse = {
  sessions: Session[];
  total: number;
  page: number;
  pageSize: number;
};

type FetchSessionsParams = {
  sortBy: string;
  order: 'asc' | 'desc';
};

const fetchSessions = async ({
  pageParam = 1,
  queryKey,
}: any): Promise<SessionsResponse> => {
  const [, { sortBy, order }] = queryKey;
  const { data } = await axios.get<SessionsResponse>(
    `/api/sessions?page=${pageParam}&pageSize=20&sortBy=${sortBy}&order=${order}`,
  );
  return data;
};

export const useSessions = ({ sortBy, order }: FetchSessionsParams) =>
  useInfiniteQuery<SessionsResponse, Error>({
    queryKey: ['sessions', { sortBy, order }],
    queryFn: fetchSessions,
    getNextPageParam: (lastPage) => {
      const { page, pageSize, total } = lastPage;
      const maxPage = Math.ceil(total / pageSize);
      return page < maxPage ? page + 1 : undefined;
    },
  });
