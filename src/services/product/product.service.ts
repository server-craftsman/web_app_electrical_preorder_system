import { BaseService } from '../config/base.service';
import { API_PATH } from '../../const';
import { formatResponseSuccess, ResponseSuccessForList } from '../../app/interface/response_success.interface';
import { CreateProductResponseModel, GetAllProductResponseModel, UpdateProductResponseModel } from '../../models/api/response/product.res.model';
import { CreateProductRequestModel, UpdateProductRequestModel} from '../../models/api/request/product.req.model';


export const ProductService = {
  getAll(params: any) {
    return BaseService.get<ResponseSuccessForList<GetAllProductResponseModel>>({
      url: API_PATH.PRODUCT.GET_ALL,
      payload: params,
    });
  },

  detail(id: string){
    return BaseService.get<formatResponseSuccess<GetAllProductResponseModel>>({
      url: API_PATH.PRODUCT.DETAIL.replace(":id", id),
    })
  },

  create: async (productData: CreateProductRequestModel, files: File[]): Promise<CreateProductResponseModel> => {
    const formData = new FormData();

    // Convert product data to JSON and add to FormData
    formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));

    // Add image files to FormData
    files.forEach((file) => {
      formData.append("imageFiles", file);
    });

    const response = await BaseService.createProduct<CreateProductResponseModel>(API_PATH.PRODUCT.GET_ALL, formData);
    return response.data;
  },

  update: async (id: string, productData: UpdateProductRequestModel, files: File[]): Promise<UpdateProductResponseModel> => {
    const formData = new FormData();

    // Convert product data to JSON and add to FormData
    formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));

    // Add image files to FormData
    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await BaseService.updateProduct<UpdateProductResponseModel>(
      API_PATH.PRODUCT.UPDATE.replace(":id", id),
       formData);
    return response.data;
  },
};
