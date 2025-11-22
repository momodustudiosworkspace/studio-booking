export interface UserTypesResponse {
  _id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  passwordHash?: string;
  isMember?: string;
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

export interface UserSubscriptionEmailRequest{
  email: string;
}
export interface UserSubscriptionEmailResponse{
  message: string;
  status: string;
}
