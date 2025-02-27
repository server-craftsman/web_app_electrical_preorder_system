import { GetAllProductResponseModel } from "./product.res.model";

export interface CampaignResponseModel {
    id: string; // UUID
    name: string;
    startDate: string; // LocalDateTime
    endDate: string; // LocalDateTime
    minQuantity: number; // Integer
    maxQuantity: number; // Integer
    totalAmount: number; // BigDecimal
    status: string; // CampaignStatus
    product: GetAllProductResponseModel;
    createdAt: string; // LocalDateTime
    updatedAt: string; // LocalDateTime
}