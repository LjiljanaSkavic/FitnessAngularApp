import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FitnessProgramPurchase } from "../../../models/FitnessProgramPurchase";
import { ConfirmationModalComponent } from "../../../confirmation-modal/confirmation-modal.component";
import { EMPTY, Subscription, switchMap } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { FitnessProgramPurchaseService } from "../../../services/fitness-program-purchase.service";

@Component({
  selector: 'app-fitness-program-purchase-card',
  templateUrl: './fitness-program-purchase-card.component.html',
  styleUrls: ['./fitness-program-purchase-card.component.scss']
})
export class FitnessProgramPurchaseCardComponent implements OnDestroy {

  @Input() purchase: FitnessProgramPurchase;
  @Output() purchaseDeletedEmitter = new EventEmitter<number>();
  subscription = new Subscription();

  constructor(private _fitnessProgramPurchaseService: FitnessProgramPurchaseService,
              public dialog: MatDialog) {

  }


  onDeletePurchase(id: number) {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: "Delete purchase history",
        text: "Are you sure that you want to delete this purchase?"
      }
    }).afterClosed().pipe(switchMap(result => {
      return result ? this._fitnessProgramPurchaseService.deleteById(id) : EMPTY
    })).subscribe(res => {
      this.purchaseDeletedEmitter.emit(id);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
