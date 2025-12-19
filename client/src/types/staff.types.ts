export interface IStaff {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phoneNumber: string;
  role: "engineer" | "photographer" | "producer" | "manager" | "admin";
  specialization: string[];
  hire_date?: Date;
  status?: "active" | "inactive" | "suspended";
  hourly_rate: number;
  bio?: string;
  profile_image?: string;
  availability?: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  isInvitationAccepted: boolean;
  working_hours?: {
    start_time: string;
    end_time: string;
  };
  permissions?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Request type (same as IStaff for most operations)
export type StaffRequest = Omit<IStaff, "_id" | "createdAt" | "updatedAt">;

// Response type (includes all fields with _id and timestamps)
export interface StaffResponse extends IStaff {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Invitation request type
export interface InviteStaffRequest {
  first_name: string;
  last_name: string;
  email: string;
  role: "engineer" | "photographer" | "producer" | "manager" | "admin";
}

// Accept invitation request type
export interface AcceptInvitationRequest {
  token: string;
  // phoneNumber: string;
  // hourly_rate: number;
  // specialization?: string[];
  // bio?: string;
}

// API Response wrapper types
export interface StaffApiResponse<T> {
  status: number;
  message: string;
  data: T;
  staff?: T; // Some endpoints return data as 'staff'
}

export interface StaffListResponse {
  status: number;
  message: string;
  data: StaffResponse[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface StaffStatisticsResponse {
  status: number;
  message: string;
  data: {
    totalStaff: number;
    activeStaff: number;
    inactiveStaff: number;
    staffByRole: Array<{
      _id: string;
      count: number;
    }>;
  };
}
