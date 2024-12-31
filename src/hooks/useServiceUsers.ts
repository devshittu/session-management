import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ServiceUser } from '@/types/serviceUser';

type FetchServiceUsersParams = {
  pageParam?: number;
  queryKey: any;
};

type ServiceUsersResponse = {
  serviceUsers: ServiceUser[] | { [wardName: string]: ServiceUser[] };
  total: number;
  page: number;
  pageSize: number;
};

export const useServiceUsers = ({
  statusFilter,
  sortBy,
  order,
  groupByWard,
}: {
  statusFilter: 'admitted' | 'discharged' | 'all';
  sortBy: string;
  order: 'asc' | 'desc';
  groupByWard: boolean;
}) =>
  useInfiniteQuery<ServiceUsersResponse, Error>({
    queryKey: ['serviceUsers', { statusFilter, sortBy, order, groupByWard }],
    queryFn: async ({ pageParam = 1, queryKey }: FetchServiceUsersParams) => {
      const [, { statusFilter, sortBy, order, groupByWard }] = queryKey;
      const params = new URLSearchParams();
      params.append('page', pageParam.toString());
      params.append('pageSize', '20');
      params.append('sortBy', sortBy);
      params.append('order', order);
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      if (groupByWard) {
        params.append('groupByWard', 'true');
      }
      const response = await axios.get<ServiceUsersResponse>(
        `/api/serviceUsers?${params.toString()}`,
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      const { page, pageSize, total } = lastPage;
      const maxPage = Math.ceil(total / pageSize);
      return page < maxPage ? page + 1 : undefined;
    },
  });

// src/hooks/useServiceUsers.ts
