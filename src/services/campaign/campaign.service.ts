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
  // role: 'admin',
  create(params: CreateCampaignRequestModel) {
    return BaseService.post<formatResponseSuccess<CampaignResponseModel>>({
      url: API_PATH.CAMPAIGN.BASE,
      payload: params,
    });
  },
  // role: 'admin',
  getById(id: string, params: any) {
    return BaseService.get<formatResponseSuccess<CampaignResponseModel>>({
      url: API_PATH.CAMPAIGN.GET_BY_ID.replace(':id', id),
      payload: params,
    });
  },
  // role: 'admin',
  update(id: string, params: CreateCampaignRequestModel) {
    return BaseService.put<formatResponseSuccess<CampaignResponseModel>>({
      url: API_PATH.CAMPAIGN.UPDATE.replace(':id', id),
      payload: params,
    });
  },
  // role: 'admin',
  delete(id: string) {
    return BaseService.remove<formatResponseSuccess<CampaignResponseModel>>({
      url: API_PATH.CAMPAIGN.DELETE.replace(':id', id),
    });
  },
  // role: 'admin',
  // deleteMultiple(ids: string[]) {
  //   return BaseService.remove<formatResponseSuccess<CampaignResponseModel>>({
  //     url: API_PATH.CAMPAIGN.DELETE.replace(':id', ''),
  //     payload: ids,
  //   });
  // },
};
