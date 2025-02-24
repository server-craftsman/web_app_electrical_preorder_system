import { BaseService } from '../config/base.service';
import { API_PATH } from '../../const';
import { ResponseSuccessForList } from '../../app/interface/response_success.interface';
import { CreateCategoryResponseModel, GetAllProductResponseModel } from '../../models/api/response/product.res.model';
import { CreateProductRequestModel } from '../../models/api/request/product.req.model';

export const ProductService = {
  getAll(params: any) {
    return BaseService.get<ResponseSuccessForList<GetAllProductResponseModel>>({
      url: API_PATH.PRODUCT.GET_ALL,
      payload: params,
    });
  },

  create: async (productData: CreateProductRequestModel, files: File[]): Promise<CreateCategoryResponseModel> => {
    const formData = new FormData();

    // Convert product data to JSON and add to FormData
    formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));

    // Add image files to FormData
    files.forEach((file) => {
      formData.append("imageFiles", file);
    });

    const response = await BaseService.createProduct<CreateCategoryResponseModel>(API_PATH.PRODUCT.GET_ALL, formData);
    return response.data;
  },
};
