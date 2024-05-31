import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { FitnessProgramPurchaseService } from "../../services/fitness-program-purchase.service";
import { FitnessProgramPurchase } from "../../models/FitnessProgramPurchase";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-fitness-purchases-list',
  templateUrl: './fitness-purchases-list.component.html',
  styleUrls: ['./fitness-purchases-list.component.scss']
})
export class FitnessPurchasesListComponent implements OnInit, OnDestroy {

  userId: number;
  subscription = new Subscription();
  purchases: FitnessProgramPurchase[] = [];
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  isLoading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private _activatedRoute: ActivatedRoute,
              private _fitnessProgramPurchaseService: FitnessProgramPurchaseService) {
  }

  ngOnInit(): void {
    this.subscription.add(this._activatedRoute.params.subscribe(params => {
      this.userId = +params['id'];
      this.displayPurchases();
    }));
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.displayPurchases();
  }

  displayPurchases(): void {
    this.isLoading = true;
    this.subscription.add(this._fitnessProgramPurchaseService.search(this.userId, this.pageIndex, this.pageSize).subscribe(res => {
      this.purchases = res.fitnessProgramPurchases.map(purchase => {
        return {
          ...purchase,
          paymentType: +purchase.paymentType
        };
      });
      this.totalItems = res.totalElements;
      this.isLoading = false;
    }));
  }


  purchaseDeleted(purchaseId: number): void {
    const index = this.purchases.findIndex(purchase => purchase.id === purchaseId);
    if (index !== -1) {
      this.purchases.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
