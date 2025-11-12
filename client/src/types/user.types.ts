
export interface UserTypesResponse{
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