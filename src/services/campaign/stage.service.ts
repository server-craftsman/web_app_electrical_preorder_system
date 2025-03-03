import { BaseService } from '../config/base.service';
import { API_PATH } from '../../const';
import {
  formatResponseSuccess
} from '../../app/interface/response_success.interface';

export const StageService = {
  getAll(params: any) {
    return BaseService.get<formatResponseSuccess<any>>({
      url: API_PATH.CAMPAIGN_STAGE.BASE,
      payload: params,
    });
  },
};
