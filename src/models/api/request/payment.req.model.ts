import { PaymentMethod } from "../../../app/enums";

export interface CreatePaymentRequestModel {
    orderIds: string[];
    buyerName: string;
    buyerPhone: string;
    buyerAddress: string;
    method: PaymentMethod;
}
