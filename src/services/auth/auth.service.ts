import { BaseService } from '../config/base.service';
import { API_PATH } from '../../const';
// import { formatResponseSuccess } from '../../app/interface/response_success.interface';
import {
  loginParams,
  queryParams,
  socialLoginCallbackParams,
} from './../../models/api/request/auth.req.model';
import { socialLoginCallbackResponse } from './../../models/api/response/auth.res.model';
import { formatResponseSuccess } from '../../app/interface/response_success.interface';

export const AuthService = {
  socialLogin(params: queryParams) {
    const queryString = new URLSearchParams(
      params as unknown as Record<string, string>
    ).toString();
    const url = `${API_PATH.AUTH.SOCIAL_LOGIN}?${queryString}`;
    return BaseService.get({
      url: url,
    });
  },
  socialLoginCallback(params: socialLoginCallbackParams) {
    const queryString = new URLSearchParams(
      params as unknown as Record<string, string>
    ).toString();
    const url = `${API_PATH.AUTH.SOCIAL_LOGIN_CALLBACK}?${queryString}`;
    return BaseService.get<socialLoginCallbackResponse>({
      url: url,
    });
  },
  login(params: loginParams) {
    return BaseService.post<{ accessToken: string }>({
      url: API_PATH.AUTH.LOGIN,
      payload: params,
    });
  },
  verifyToken(params: {token: string}) {
    return BaseService.post<formatResponseSuccess<string>>({
      url: API_PATH.USER.VERIFY_TOKEN,
      payload: params,
      isLoading: true,
    });
  },
};
