import { API_PATH } from './../../const/api.path';
import { BaseService } from './../config/base.service';
import { formatResponseSuccess } from './../../app/interface/response_success.interface';
import { GetAllCategoryResponseModel } from '../../models/api/response/category.res.model';
import {
  CreateCategoryRequestModel,
  UpdateCategoryRequestModel,
} from '../../models/api/request/category.req.model';
import { UpdateCategoryResponse } from '../../models/api/response/category.res.model';
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
  update(params: UpdateCategoryRequestModel) {
    return BaseService.put<formatResponseSuccess<UpdateCategoryResponse>>({
      url: API_PATH.CATEGORY.UPDATE.replace(':id', params.id),
      payload: params,
    });
  },
  delete(id: string) {
    return BaseService.remove<formatResponseSuccess<any>>({
      url: API_PATH.CATEGORY.DELETE.replace(':id', id),
    });
  },
};
