import { OrderStatus } from "../../../app/enums";
import { CampaignResponseModel } from "../../api/response/campaign.res.model";
import { Campaign } from "../../modules/Campaign";
import { User } from "../../modules/User";

export interface OrderResModel {
    id: string;
    quantity: number;
    status: OrderStatus;
    totalAmount: number;
    user: User;
    campaign: Campaign;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface OrderViewResModel {
    id: string;
    quantity: number;
    status: OrderStatus;
    totalAmount: number;
    user: User;
    campaign: CampaignResponseModel;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}