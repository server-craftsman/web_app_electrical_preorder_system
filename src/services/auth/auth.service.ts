import { BaseService } from '../config/base.service';
import { API_PATH } from '../../const';
import { formatResponseSuccess } from './../../app/interface/response_success.interface';
import { queryParams, socialLoginCallbackParams } from './../../models/api/request/auth.req.model';

export const AuthService = {
    socialLogin(params: queryParams) {
        const url = `${API_PATH.AUTH.SOCIAL_LOGIN}?${params}`;
        return BaseService.get({
            url: url,
            payload: params,
        });
    },
    socialLoginCallback(params: socialLoginCallbackParams) {
        // const url = `${API_PATH.AUTH.SOCIAL_LOGIN_CALLBACK}?${params}`;
        return BaseService.get<formatResponseSuccess<any>>({
            url: API_PATH.AUTH.SOCIAL_LOGIN_CALLBACK,
            payload: params,
        });
    },
    
}