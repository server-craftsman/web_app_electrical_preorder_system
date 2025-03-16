export interface User {
  id: string;
  username: string;
  fullname: string;
  email: string | null;
  googleAccountId: string | null;
  phoneNumber: string | null;
  password: string | null;
  avatar?: string | null;
  status: string;
  role: string;
  token: string | null;
  tokenExpires: string | null;
  address: string | null;
  orders: any[];
  createdAt: string;
  updatedAt: string;
  verified: boolean;
}
