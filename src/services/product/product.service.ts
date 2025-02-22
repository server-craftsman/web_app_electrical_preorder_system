import { BaseService } from '../config/base.service';
import { API_PATH } from '../../const';
import { formatResponseSuccess, ResponseSuccessForList } from '../../app/interface/response_success.interface';
import { CreateCategoryResponseModel, GetAllProductResponseModel } from '../../models/api/response/product.res.model';
import { CreateProductRequestModel } from '../../models/api/request/product.req.model';

export const ProductService = {
  getAll(params: any) {
    return BaseService.get<ResponseSuccessForList<GetAllProductResponseModel>>({
      url: API_PATH.PRODUCT.GET_ALL,
      payload: params,
    });
  },

  create(params: CreateProductRequestModel)  {
    return BaseService.post<formatResponseSuccess<CreateCategoryResponseModel>>({
      url: API_PATH.PRODUCT.GET_ALL,
      payload: params
    })
  },
};
