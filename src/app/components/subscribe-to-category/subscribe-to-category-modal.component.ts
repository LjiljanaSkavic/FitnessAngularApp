import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from "@angular/material/select";
import { Category } from "../../models/dto/Category";
import { Subscription } from "rxjs";
import { CategoryService } from "../../services/category.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

interface DialogData {
  userId: number,
}

@Component({
  selector: 'app-subscribe-to-category',
  templateUrl: './subscribe-to-category-modal.component.html',
  styleUrls: ['./subscribe-to-category-modal.component.scss']
})
export class SubscribeToCategoryModalComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  subscriptions = new Subscription();
  categoriesLoading = true;
  dialogData: DialogData;

  constructor(private _dialogRef: MatDialogRef<SubscribeToCategoryModalComponent>,
              private _categoryService: CategoryService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dialogData = data;
  }

  ngOnInit(): void {
    this.subscriptions.add(this._categoryService.getAll().subscribe(res => {
      this.categories = res;
      this.categoriesLoading = false;
    }));
  }


  onDiscardClick(): void {
    this._dialogRef.close(false);
  }

  onSubscribeToCategoryClick(): void {

  }

  onCategoryChange($event: MatSelectChange) {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
