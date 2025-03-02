import { API_PATH } from '../../const';
import { BaseService } from '../config/base.service';
import {
  formatResponseSuccess,
  ResponseSuccessForList,
} from '../../app/interface/response_success.interface';
import { User } from '../../models/modules/User';
import { CreateUserRequestModel } from '../../models/api/request/user.req.model';

export const UserService = {
  getAll(params: any) {
    return BaseService.get<ResponseSuccessForList<User>>({
      url: API_PATH.USER.GET_ALL,
      payload: params,
    });
  },
  create(params: CreateUserRequestModel) {
    return BaseService.post<formatResponseSuccess<User>>({
      url: API_PATH.USER.CREATE,
      payload: params,
    });
  },
};
