export interface CreateCategoryRequestModel {
  id: string | null;
  name: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

export interface UpdateCategoryRequestModel {
  id: string;
  name: string;
}
