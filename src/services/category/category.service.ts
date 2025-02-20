import { API_PATH } from './../../const/api.path';
import { BaseService } from './../config/base.service';
import { formatResponseSuccess } from './../../app/interface/response_success.interface';
import { GetAllCategoryResponseModel } from '../../models/api/response/category.res.model';
import {CreateCategoryRequestModel} from '../../models/api/request/category.req.model'
export const CategoryService = {
  getAll(params: Record<string, unknown>) {
    return BaseService.get<formatResponseSuccess<GetAllCategoryResponseModel>>({
      url: API_PATH.CATEGORY.BASE,
      payload: params,
    });
  },
  create(params: CreateCategoryRequestModel) {
    return BaseService.post<formatResponseSuccess<GetAllCategoryResponseModel>>(
      {
        url: API_PATH.CATEGORY.BASE,
        payload: params,
      }
    );
  },
  update(params: Record<string, unknown>) {
    return BaseService.put<formatResponseSuccess<GetAllCategoryResponseModel>>({
      url: API_PATH.CATEGORY.BASE,
      payload: params,
    });
  },
};
