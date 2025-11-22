export interface VerifyOtpTypesResponse {
  message: string;
  status: number;
}
export interface VerifyOtpTypesRequest {
  otp: string;
}
export interface SendOtpTypesRequest {
  email: string;
  purpose :string
}

export interface SendOtpTypesResponse {
  status: number;
  message: string;
}
export interface UpdatePasswordTypesResponse {
  status: number;
  message: string;
}
export interface UpdatePasswordTypesRequest {
  password: string;
  email: string;
}