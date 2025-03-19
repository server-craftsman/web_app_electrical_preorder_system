import { PaymentStatus } from "../../../app/enums";

export interface CreatePaymentResponseModel {
  bin: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  description: string;
  orderCode: number;
  currency: string;
  paymentLinkId: string;
  status: PaymentStatus;
  expiredAt: number;
  checkoutUrl: string;
  qrCode: string;
}
export interface PaymentResModel {
  id: number;
  date: string | null;
  amount: number;
  method: string;
  status: string;
  orderIds: string[];
  createdAt: string;
  updatedAt: string;
}