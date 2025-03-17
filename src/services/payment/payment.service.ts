import { BaseService } from '../config/base.service';
import { API_PATH } from '../../const';
import { formatResponseSuccess } from '../../app/interface/response_success.interface';
import { CreatePaymentRequestModel } from '../../models/api/request/payment.req.model';
import { CreatePaymentResponseModel } from '../../models/api/response/payment.res.model';

export const PaymentService = {
  createPayment(params: CreatePaymentRequestModel) {
    return BaseService.post<formatResponseSuccess<CreatePaymentResponseModel>>({
      url: API_PATH.PAYMENT.CREATE,
      payload: params,
    });
  },
  getPaymentByOrderCode(orderCode: string) {
    return BaseService.get<formatResponseSuccess<any>>({
      url: API_PATH.PAYMENT.GET_PAYMENT_BY_ORDER_CODE.replace(':id', orderCode),
    });
  },
};
