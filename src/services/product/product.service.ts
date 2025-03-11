import { BaseService } from '../config/base.service';
import { API_PATH } from '../../const';
import {
  formatResponseSuccess,
  ResponseSuccessForList,
} from '../../app/interface/response_success.interface';
import {
  CreateProductResponseModel,
  GetAllProductResponseModel,
  UpdateProductResponseModel,
} from '../../models/api/response/product.res.model';
import {
  CreateProductRequestModel,
  UpdateProductRequestModel,
} from '../../models/api/request/product.req.model';

export const ProductService = {
  getAll(params: any) {
    return BaseService.get<ResponseSuccessForList<GetAllProductResponseModel>>({
      url: API_PATH.PRODUCT.GET_ALL,
      payload: params,
    });
  },

  getById(id: string) {
    return BaseService.get<formatResponseSuccess<GetAllProductResponseModel>>({
      url: API_PATH.PRODUCT.GET_BY_ID.replace(':id', id),
    });
  },

  getBySlug(slug: string) {
    return BaseService.get<formatResponseSuccess<GetAllProductResponseModel>>({
      url: API_PATH.PRODUCT.GET_BY_SLUG.replace(':slug', slug),
    });
  },

  create: async (
    productData: CreateProductRequestModel,
    files: File[]
  ): Promise<CreateProductResponseModel> => {
    const formData = new FormData();

    // Convert product data to JSON and add to FormData
    formData.append(
      'product',
      new Blob([JSON.stringify(productData)], { type: 'application/json' })
    );

    // Add image files to FormData
    files.forEach((file) => {
      formData.append('imageFiles', file);
    });

    const response =
      await BaseService.createProduct<CreateProductResponseModel>(
        API_PATH.PRODUCT.GET_ALL,
        formData
      );
    return response.data;
  },

  update: async (
    id: string,
    productData: UpdateProductRequestModel,
    files: File[]
  ): Promise<UpdateProductResponseModel> => {
    const formData = new FormData();

    // Convert product data to JSON and add to FormData
    formData.append(
      'product',
      new Blob([JSON.stringify(productData)], { type: 'application/json' })
    );

    // Add image files to FormData
    files.forEach((file) => {
      formData.append('imageFiles', file);
    });

    const response =
      await BaseService.updateProduct<UpdateProductResponseModel>(
        API_PATH.PRODUCT.UPDATE.replace(':id', id),
        formData
      );
    return response.data;
  },
  delete(id: string) {
    return BaseService.remove<formatResponseSuccess<any>>({
      url: API_PATH.PRODUCT.DELETE.replace(':id', id),
    });
  },
  deleteMultiple(queryParams: string) {
    return BaseService.remove<formatResponseSuccess<any>>({
      url: `${API_PATH.PRODUCT.DELETE_MULTIPLE}?${queryParams}`,
    });
  },
  // search(query: string, page: number = 0, size: number = 10) {
  //   return BaseService.get<ResponseSuccessForList<GetAllProductResponseModel>>({
  //     url: API_PATH.PRODUCT.SEARCH,
  //     payload: { query, page, size },
  //   });
  // },
};
