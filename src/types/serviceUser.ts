// types/serviceUser.ts
export type ServiceUserStatus = 'admitted' | 'discharged';

export type ServiceUser = {
  id: number;
  name: string;
  ward: {
    id: number;
    name: string;
  };
  wardId: number;
  sessions: Session[];
  status: ServiceUserStatus;
  createdAt: string;
  updatedAt?: string | null;
};

export type Session = {
  id: number;
  serviceUserId: number;
  activityId: number;
  timeIn: string;
  timeOut?: string | null;
};
