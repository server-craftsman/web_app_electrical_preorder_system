import { API_PATH } from '../../const';
import {BaseService} from '../config/base.service';
import { ResponseSuccessForList } from '../../app/interface/response_success.interface';
import { User } from '../../models/modules/User';

export const UserService = {
  getAll() {
    return BaseService.get<ResponseSuccessForList<User>>({ url: API_PATH.USER.GET_ALL });
  },
};
