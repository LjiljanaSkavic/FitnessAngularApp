import { Pipe, PipeTransform } from '@angular/core';
import { PAYMENT_TYPE, PAYMENT_TYPE_OPTIONS } from "../models/FitnessProgramPurchaseRequest";

@Pipe({
  name: 'paymentType'
})
export class PaymentTypePipe implements PipeTransform {

  transform(value: PAYMENT_TYPE): string {
    console.log(value);
    switch (value) {
      case PAYMENT_TYPE.PAY_PAL:
        return PAYMENT_TYPE_OPTIONS.PAY_PAL;
      case PAYMENT_TYPE.CREDIT_CARD:
        return PAYMENT_TYPE_OPTIONS.CREDIT_CARD;
      case PAYMENT_TYPE.ON_LOCATION:
        return PAYMENT_TYPE_OPTIONS.ON_LOCATION;
      default:
        return 'Unknown';
    }
  }
}
