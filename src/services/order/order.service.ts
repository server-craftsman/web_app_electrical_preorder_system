import { BaseService } from '../config/base.service';
import { API_PATH } from '../../const';
import { formatResponseSuccess } from '../../app/interface/response_success.interface';
import { CreateOrderRequestModel } from '../../models/api/request/order.req.model';

export const OrderService = {
  createOrder(params: CreateOrderRequestModel) {
    return BaseService.post<formatResponseSuccess<any>>({
      url: API_PATH.ORDER.CREATE,
      payload: params,
    });
  },
};
