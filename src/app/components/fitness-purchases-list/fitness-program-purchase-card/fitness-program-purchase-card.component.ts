import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FitnessProgramPurchase } from "../../../models/fitness-program-purchase";
import { ConfirmationModalComponent } from "../../confirmation-modal/confirmation-modal.component";
import { EMPTY, Subscription, switchMap } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { FitnessProgramPurchaseService } from "../../../services/fitness-program-purchase.service";
import { FileService } from "../../../services/file.service";

@Component({
  selector: 'app-fitness-program-purchase-card',
  templateUrl: './fitness-program-purchase-card.component.html',
  styleUrls: ['./fitness-program-purchase-card.component.scss']
})
export class FitnessProgramPurchaseCardComponent implements OnInit, OnDestroy {

  @Input() purchase: FitnessProgramPurchase;
  @Output() purchaseDeletedEmitter = new EventEmitter<number>();
  fileUrl: any;
  subscriptions = new Subscription();

  constructor(private _fitnessProgramPurchaseService: FitnessProgramPurchaseService,
              public dialog: MatDialog,
              private _fileService: FileService) {

  }

  ngOnInit(): void {
    this.getFile();
  }

  onDeletePurchase(id: number): void {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: "Delete purchase history",
        text: "Are you sure that you want to delete this purchase?"
      },
      hasBackdrop: true,
      backdropClass: 'fitness-app-backdrop'
    }).afterClosed().pipe(switchMap(result => {
      return result ? this._fitnessProgramPurchaseService.deleteById(id) : EMPTY
    })).subscribe(res => {
      this.purchaseDeletedEmitter.emit(id);
    })
  }

  getFile(): void {
    this.subscriptions.add(
      this._fileService.getFileById(this.purchase.fitnessProgramCard.image.id).subscribe(
        (data: Blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onloadend = () => {
            this.fileUrl = reader.result;
          };
        },
        error => {
          //TODO: Handle error
          console.error('Error retrieving file:', error);
        }
      ));
  }

  openYouTubeVideo(): void {
    window.open(this.purchase.fitnessProgramCard.location, '_blank');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
