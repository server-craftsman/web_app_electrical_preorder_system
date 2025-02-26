export interface GetAllCategoryResponseModel {
  id: string;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  deleted: boolean;
}
[];

// export interface UpdateCategoryResponseModel {
//   id: string;
//   name: string;
// }

export interface UpdateCategoryResponse {
  id: string;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  deleted: boolean;
}
