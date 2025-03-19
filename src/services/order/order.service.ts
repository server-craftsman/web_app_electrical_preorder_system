import { BaseService } from '../config/base.service';
import { API_PATH } from '../../const';
import { formatResponseSuccess, ResponseOrderViewSuccess } from '../../app/interface/response_success.interface';
import { CreateOrderRequestModel } from '../../models/api/request/order.req.model';
import { OrderResModel, OrderViewResModel } from '../../models/api/response/order.res.model';

export const OrderService = {
  createOrder(params: CreateOrderRequestModel) {
    return BaseService.post<formatResponseSuccess<OrderResModel>>({
      url: API_PATH.ORDER.CREATE,
      payload: params,
    });
  },
  viewOrder(status = 'all', page = 0, size = 10) {
    return BaseService.get<ResponseOrderViewSuccess<OrderViewResModel>>({
      url: `${API_PATH.ORDER.VIEW_ORDER}?status=${status}&page=${page}&size=${size}`,
    });
  },
  viewOrderByAdmin(status = 'PENDING', page = 0, size = 10) {
    return BaseService.get<ResponseOrderViewSuccess<OrderViewResModel>>({
      url: `${API_PATH.ORDER.VIEW_ORDER_BY_ADMIN}?status=${status}&page=${page}&size=${size}`,
    });
  }
};
