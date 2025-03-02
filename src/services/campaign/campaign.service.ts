import { BaseService } from '../config/base.service';
import { API_PATH } from '../../const';
import {
  formatResponseSuccess,
  ResponseSuccessForList,
} from '../../app/interface/response_success.interface';
import { CampaignResponseModel } from '../../models/api/response/campaign.res.model';
import { CreateCampaignRequestModel } from '../../models/api/request/campaign.req.model';

export const CampaignService = {
  getAll(params: any) {
    return BaseService.get<ResponseSuccessForList<CampaignResponseModel>>({
      url: API_PATH.CAMPAIGN.BASE,
      payload: params,
    });
  },
  create(params: CreateCampaignRequestModel) {
    return BaseService.post<formatResponseSuccess<CampaignResponseModel>>({
      url: API_PATH.CAMPAIGN.BASE,
      payload: params,
    });
  },
};
