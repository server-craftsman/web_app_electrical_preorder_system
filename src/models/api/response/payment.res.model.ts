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

// public class PaymentDTO {
//     private Long id;
//     private LocalDateTime date;
//     private BigDecimal amount;
//     private PaymentMethod method;
//     private PaymentStatus status;
//     private List<UUID> orderIds;
//     private LocalDateTime createdAt;
//     private LocalDateTime updatedAt;
// }

// {
//     "message": "Payment created successfully",
//     "data": {
//       "bin": "970422",
//       "accountNumber": "VQRQABRLS0448",
//       "accountName": "NGUYEN VAN DAI",
//       "amount": 2000,
//       "description": "18f8746b181045f0a2ce",
//       "orderCode": 185476478,
//       "currency": "VND",
//       "paymentLinkId": "ef15b8d0e6134511a8a902e6b28a46c0",
//       "status": "PENDING",
//       "expiredAt": 1742195073,
//       "checkoutUrl": "https://pay.payos.vn/web/ef15b8d0e6134511a8a902e6b28a46c0",
//       "qrCode": "00020101021238570010A000000727012700069704220113VQRQABRLS04480208QRIBFTTA5303704540420005802VN6224082018f8746b181045f0a2ce63040FC0"
//     }
//   }