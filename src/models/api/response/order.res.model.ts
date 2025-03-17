import { OrderStatus } from "../../../app/enums";
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