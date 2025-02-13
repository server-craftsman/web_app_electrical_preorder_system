import { BaseService } from '../config/base.service';
import { API_PATH } from '../../const';
import { ResponseSuccessForList } from '../../app/interface/response_success.interface';
import { GetAllCategoryResponseModel } from '../../models/api/response/product.res.model';

export const ProductService = {
  getAll(params: any) {
    return BaseService.get<ResponseSuccessForList<GetAllCategoryResponseModel>>(
      {
        url: API_PATH.PRODUCT.GET_ALL,
        payload: params,
      }
    );
  },
};
