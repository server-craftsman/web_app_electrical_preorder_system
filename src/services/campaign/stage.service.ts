import { BaseService } from '../config/base.service';
import { API_PATH } from '../../const';
import { formatResponseSuccess } from '../../app/interface/response_success.interface';
import { CreateCampaignStageRequestModel } from '../../models/api/request/campaign.req.model';
import { CampaignStageResponseModel } from '../../models/api/response/campaign.res.model';

export const StageService = {
  create(params: CreateCampaignStageRequestModel, id: string) {
    return BaseService.post<formatResponseSuccess<CampaignStageResponseModel>>({
      url: API_PATH.CAMPAIGN_STAGE.BASE.replace(':id', id),
      payload: params,
    });
  },
  getAll(params: any) {
    return BaseService.get<formatResponseSuccess<CampaignStageResponseModel>>({
      url: API_PATH.CAMPAIGN_STAGE.BASE,
      payload: params,
    });
  },
  update(params: CreateCampaignStageRequestModel, id: string, stageId: string) {
    return BaseService.put<formatResponseSuccess<CampaignStageResponseModel>>({
      url: API_PATH.CAMPAIGN_STAGE.UPDATE.replace(':id', id).replace(
        ':stageId',
        stageId
      ),
      payload: params,
    });
  },
  delete(params: any, id: string, stageId: string) {
    return BaseService.remove<formatResponseSuccess<null>>({
      url: API_PATH.CAMPAIGN_STAGE.DELETE.replace(':id', id).replace(
        ':stageId',
        stageId
      ),
      payload: params,
    });
  },
};
