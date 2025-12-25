export interface IPagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface IPackage {
  title: string;
  price: number;
  discount: number;
  services: string[];
}
export interface ISession {
  _id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  description: string;
  packages?: IPackage[];
  updatedAt: string;
  __v: number;
}
export interface GetAllSessionsResponse {
  status: number;
  message: string;
  data: ISession[];
  pagination: IPagination;
}
