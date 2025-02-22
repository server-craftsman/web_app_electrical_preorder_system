export interface GetAllCategoryResponseModel {
  id: string | null;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  deleted: boolean;
}
[];

export interface UpdateCategoryResponseModel {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}
