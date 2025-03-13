import { API_PATH } from '../../const';
import { BaseService } from '../config/base.service';
import {
  formatResponseSuccess,
  ResponseSuccessForList,
  ResponseUserManagerSuccess,
} from '../../app/interface/response_success.interface';
import { User } from '../../models/modules/User';
import {
  ChangePasswordRequestModel,
  CreateUserRequestModel,
  UpdateUserRequestModel,
} from '../../models/api/request/user.req.model';
export const UserService = {
  getAll(params: any) {
    const url = `${API_PATH.USER.GET_ALL}?page=${params.page || 0}&size=${params.size || 10}`;
    return BaseService.get<ResponseUserManagerSuccess<User>>({
      url: url,
      payload: params,
    });
  },
  create(params: CreateUserRequestModel) {
    return BaseService.post<formatResponseSuccess<User>>({
      url: API_PATH.USER.CREATE,
      payload: params,
    });
  },
  getById(id: string) {
    return BaseService.get<formatResponseSuccess<User>>({
      url: API_PATH.USER.GET_USER_ID.replace(':id', id),
    });
  },
  changePassword(userId: string, params: ChangePasswordRequestModel) {
    return BaseService.put<formatResponseSuccess<User>>({
      url: API_PATH.USER.CHANGE_PASSWORD.replace(':id', userId),
      payload: params,
    });
  },
  update(userId: string, params: UpdateUserRequestModel) {
    return BaseService.put<formatResponseSuccess<User>>({
      url: API_PATH.USER.UPDATE.replace(':id', userId),
      payload: params,
    });
  },
  delete(userId: string) {
    return BaseService.remove<formatResponseSuccess<any>>({
      url: API_PATH.USER.DELETE.replace(':id', userId),
    });
  },
  deviceToken(userId: string, params: { token: string | null }) {
    return BaseService.post<formatResponseSuccess<any>>({
      url: API_PATH.USER.REGISTER_DEVICE_TOKEN.replace(':id', userId),
      payload: params,
    });
  },
};
