import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { FitnessProgramPurchaseService } from "../../services/fitness-program-purchase.service";
import { FitnessProgramPurchase } from "../../models/FitnessProgramPurchase";

@Component({
    selector: 'app-fitness-purchases-list',
    templateUrl: './fitness-purchases-list.component.html',
    styleUrls: ['./fitness-purchases-list.component.scss']
})
export class FitnessPurchasesListComponent implements OnInit, OnDestroy {

    userId: number;
    subscription = new Subscription();
    purchases: FitnessProgramPurchase[] = [];

    constructor(private _activatedRoute: ActivatedRoute,
                private _fitnessProgramPurchaseService: FitnessProgramPurchaseService) {

    }


    ngOnInit(): void {
        this.subscription.add(this._activatedRoute.params.pipe(switchMap(params => {
            this.userId = +params['id'];
            return this._fitnessProgramPurchaseService.getAll(this.userId)
        })).subscribe(purchases => {
            this.purchases = purchases;
        }));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
