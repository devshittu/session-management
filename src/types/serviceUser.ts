export type ServiceUserStatus = 'admitted' | 'discharged';

export type Admission = {
  id: number;
  serviceUserId: number;
  wardId: number;
  admissionDate: string;
  dischargeDate?: string | null;
  ward: {
    id: number;
    name: string;
  };
};

export type Session = {
  id: number;
  admissionId: number;
  activityId: number;
  timeIn: string;
  timeOut?: string | null;
  activity: {
    id: number;
    name: string;
  };
};

export type ServiceUser = {
  id: number;
  nhsNumber: string; // Unique NHS-like identification
  name: string;
  // status: ServiceUserStatus;
  createdAt: string;
  updatedAt?: string | null;
  admissions: Admission[]; // A service user can have multiple admissions
};

// src/types/serviceUser.ts
