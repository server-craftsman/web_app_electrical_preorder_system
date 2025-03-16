import { BaseService } from "../config/base.service";
import { API_PATH } from "../../const";
import { formatResponseSuccess } from "../../app/interface/response_success.interface";
import { CreatePaymentRequestModel } from "../../models/api/request/payment.req.model";

export const PaymentService = {
    createPayment(params: CreatePaymentRequestModel) {
        return BaseService.post<formatResponseSuccess<any>>({
            url: API_PATH.PAYMENT.CREATE,
            payload: params,
        })
    }
}
