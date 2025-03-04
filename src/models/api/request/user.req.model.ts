export interface CreateUserRequestModel {
  username: string;
  password: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: string;
  active: boolean;
}

export interface ChangePasswordRequestModel {
  id: string,
  currentPassword: string,
  newPassword: string,
}

export interface UpdateUserRequestModel {
  fullname: string;
  address: string;
  phoneNumber: string;
}