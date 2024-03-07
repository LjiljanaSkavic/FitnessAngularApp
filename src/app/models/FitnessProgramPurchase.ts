import { PAYMENT_TYPE } from "./FitnessProgramPurchaseRequest";
import { FitnessProgramCard } from "./FitnessProgramCard";

export interface FitnessProgramPurchase {
    id: number;
    orderId: string;
    dateTime: Date;
    paymentType: PAYMENT_TYPE;
    fitnessProgramCard: FitnessProgramCard;
}
