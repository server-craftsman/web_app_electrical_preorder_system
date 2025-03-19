import { BaseService } from '../config/base.service';
import { API_PATH } from '../../const';
import { formatResponseSuccess, ResponsePaymentSuccess } from '../../app/interface/response_success.interface';
import { CreatePaymentRequestModel } from '../../models/api/request/payment.req.model';
import { CreatePaymentResponseModel, PaymentResModel } from '../../models/api/response/payment.res.model';

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
  getPayment(page: number = 0, size: number = 10, params: any = {}) {
    // Build query string from params
    let queryParams = `page=${page}&size=${size}`;
    
    if (params.sortField) {
      queryParams += `&sort=${params.sortField},${params.sortDirection || 'desc'}`;
    }
    
    if (params.status) queryParams += `&status=${params.status}`;
    if (params.method) queryParams += `&method=${params.method}`;
    if (params.id) queryParams += `&id=${params.id}`;
    if (params.amountFrom) queryParams += `&amountFrom=${params.amountFrom}`;
    if (params.amountTo) queryParams += `&amountTo=${params.amountTo}`;
    if (params.createdAtFrom) queryParams += `&createdAtFrom=${params.createdAtFrom}`;
    if (params.createdAtTo) queryParams += `&createdAtTo=${params.createdAtTo}`;
    
    return BaseService.get<ResponsePaymentSuccess<PaymentResModel>>({
      url: `${API_PATH.PAYMENT.PAYMENT}?${queryParams}`,
    });
  }
};
