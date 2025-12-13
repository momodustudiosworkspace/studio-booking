export interface PackagesTypeResponse {
  session: string;
  title: string;
  price: number;
  discount: number;
  services: string[];
}

export interface PackageType {
  session: string;
  title: string;
  price: number;
  discount: number;
  services: string[];
}

export interface PackagesResponse {
  status: number;
  message: string;
  data: PackageType[];
}
