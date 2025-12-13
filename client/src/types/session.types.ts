export interface IPagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ISession {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface GetAllSessionsResponse {
  status: number;
  message: string;
  data: ISession[];
  pagination: IPagination;
}
