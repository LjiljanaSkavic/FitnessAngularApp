import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from "@angular/material/select";
import { Category } from "../../models/dto/Category";
import { Subscription } from "rxjs";
import { CategoryService } from "../../services/category.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../../services/user.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
  categoryForm: FormGroup;
  selectedCategoryId: number | null = null;

  constructor(private _dialogRef: MatDialogRef<SubscribeToCategoryModalComponent>,
              private _categoryService: CategoryService,
              private _userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dialogData = data;
  }

  ngOnInit(): void {
    this.subscriptions.add(this._categoryService.getAll().subscribe(res => {
      this.categories = res;
      this.categoriesLoading = false;
    }));

    this.categoryForm = new FormGroup({
      category: new FormControl(null, Validators.required),
    });
  }


  onDiscardClick(): void {
    this._dialogRef.close(false);
  }

  onSubscribeToCategoryClick(): void {
    this.subscriptions.add(this._userService.subscribeToCategory(this.data.userId, this.selectedCategoryId)
      .subscribe(
        () => {
          this._dialogRef.close(true);
        },
        () => {
          this._dialogRef.close(false);
        }));
  }

  onCategoryChange($event: MatSelectChange): void {
    this.selectedCategoryId = this.categoryForm.get('category').value;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
