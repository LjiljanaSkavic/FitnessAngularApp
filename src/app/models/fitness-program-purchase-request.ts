export interface FitnessProgramPurchaseRequest {
  orderId: string,
  dateTime: Date,
  paymentType: PAYMENT_TYPE,
  fitnessProgramId: number,
  appUserCustomerId: number
}

export enum PAYMENT_TYPE {
  PAY_PAL = 0,
  CREDIT_CARD = 1,
  ON_LOCATION = 2
}

export const PAYMENT_TYPE_OPTIONS = {
  PAY_PAL: "Pay Pal",
  CREDIT_CARD: "Credit card",
  ON_LOCATION: "Personally on location"
}

