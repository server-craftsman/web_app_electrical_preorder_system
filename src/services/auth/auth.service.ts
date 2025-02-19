import { BaseService } from '../config/base.service';
import { API_PATH } from '../../const';
import { queryParams, socialLoginCallbackParams } from './../../models/api/request/auth.req.model';
import { socialLoginCallbackResponse } from './../../models/api/response/auth.res.model';

export const AuthService = {
    socialLogin(params: queryParams) {
        const queryString = new URLSearchParams(params as unknown as Record<string, string>).toString();
        const url = `${API_PATH.AUTH.SOCIAL_LOGIN}?${queryString}`;
        return BaseService.get({
            url: url,
        });
    },
    socialLoginCallback(params: socialLoginCallbackParams) {
        const queryString = new URLSearchParams(params as unknown as Record<string, string>).toString();
        const url = `${API_PATH.AUTH.SOCIAL_LOGIN_CALLBACK}?${queryString}`;
        return BaseService.get<socialLoginCallbackResponse>({
            url: url,
        });
    },
    
}