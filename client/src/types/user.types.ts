export interface UserTypesResponse {
  _id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  totalBookings?: number;
  isMember?: string;
  address?: string;
  phoneNumber?: string;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: Date;
}

export interface UserProfileTypesResponse {
  user: UserTypesResponse;
  stats: {
    totalBookings: number;
    totalCompleted: number;
    totalPending: number;
    totalCancelled: number;
  };
}

export interface UserSubscriptionEmailRequest {
  email: string;
}
export interface UserSubscriptionEmailResponse {
  message: string;
  status: string;
}

export interface UpdateUserProfileResponse {
  status: "success";
  message: string;
  user: UserTypesResponse;
}

export interface UpdateUserProfileRequest {
  first_name?: string;
  last_name?: string;
  phoneNumber?: string;
  address?: string;
  image?: string;
}
