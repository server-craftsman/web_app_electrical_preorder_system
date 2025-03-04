import { BaseService } from '../config/base.service';
import { API_PATH } from '../../const';
import { formatResponseSuccess } from '../../app/interface/response_success.interface';
import { CreateCampaignStageRequestModel } from '../../models/api/request/campaign.req.model';
import { CampaignStageResponseModel } from '../../models/api/response/campaign.res.model';

export const StageService = {
  create(id: string, params: CreateCampaignStageRequestModel) {
    return BaseService.post<formatResponseSuccess<CampaignStageResponseModel>>({
      url: API_PATH.CAMPAIGN_STAGE.BASE.replace(':id', id),
      payload: params,
    });
  },
  getAll(id: string) {
    return BaseService.get<formatResponseSuccess<CampaignStageResponseModel>>({
      url: API_PATH.CAMPAIGN_STAGE.BASE.replace(':id', id),
    });
  },
  getById(id: string, params: any) {
    return BaseService.getById<
      formatResponseSuccess<CampaignStageResponseModel>
    >({
      url: API_PATH.CAMPAIGN_STAGE.BASE.replace(':id', id),
      payload: params,
    });
  },
  update(id: string, stageId: string, params: CreateCampaignStageRequestModel) {
    return BaseService.put<formatResponseSuccess<CampaignStageResponseModel>>({
      url: API_PATH.CAMPAIGN_STAGE.UPDATE.replace(':id', id).replace(
        ':stageId',
        stageId
      ),
      payload: params,
    });
  },
  delete(id: string, stageId: string, params: any) {
    return BaseService.remove<formatResponseSuccess<null>>({
      url: API_PATH.CAMPAIGN_STAGE.DELETE.replace(':id', id).replace(
        ':stageId',
        stageId
      ),
      payload: params,
    });
  },
};
