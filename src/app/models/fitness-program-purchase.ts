import { PAYMENT_TYPE } from "./fitness-program-purchase-request";
import { FitnessProgramCard } from "./fitness-program-card";

export interface FitnessProgramPurchase {
  id: number;
  orderId: string;
  dateTime: Date;
  paymentType: PAYMENT_TYPE;
  fitnessProgramCard: FitnessProgramCard;
}
