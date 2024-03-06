import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { FitnessProgramPurchaseRequest } from "../../models/FitnessProgramPurchaseRequest";
import { SharedService } from "../../services/shared.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-buy-program',
  templateUrl: './buy-program.component.html',
  styleUrls: ['./buy-program.component.scss']
})
export class BuyProgramComponent implements OnInit, OnDestroy {
  codPayingSelected = true;
  codPayingForm: FormGroup;
  creditCardPayingForm: FormGroup;
  selectPayingForm: FormGroup;
  purchase: FitnessProgramPurchaseRequest;
  subs = new Subscription();

  constructor(private _sharedService: SharedService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  get selectedFormValid(): boolean {
    return this.codPayingSelected ? !this.codPayingForm.valid : !this.creditCardPayingForm.valid;
  }

  ngOnInit(): void {
    this.selectPayingForm = new FormGroup(
      {
        payingOption: new FormControl('0')
      });

    this.codPayingForm = new FormGroup({
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      streetAddress: new FormControl('', [Validators.required]),
      streetNumber: new FormControl('', [Validators.required])
    });

    this.creditCardPayingForm = new FormGroup({
      creditCardNumber: new FormControl('', [Validators.required]),
      firstAndLastName: new FormControl('', [Validators.required]),
      cvvNumber: new FormControl('', [Validators.required]),
      confirmProcessing: new FormControl(1, [Validators.required]),
    });

    this.subs.add(this.selectPayingForm.get('payingOption')?.valueChanges.subscribe(selectedOption => {
      const option = parseInt(selectedOption);
      this.codPayingSelected = option === 0;
    }));

    this.purchase = {
      dateTime: new Date(),
      orderId: this._sharedService.getRandomEightCharactersLongString(),
      paymentType: 1,
      fitnessProgramId: this.data.fitnessProgramId,
      appUserCustomerId: this.data.userId
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
