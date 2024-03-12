import { Component, OnDestroy, OnInit } from '@angular/core';
import { FitnessProgramService } from "../../services/fitness-program.service";
import { CategoryService } from "../../services/category.service";
import { Category } from "../../models/dto/Category";
import { FormControl, FormGroup } from "@angular/forms";
import { EMPTY, Subscription, switchMap } from "rxjs";
import { FitnessProgramCard } from "../../models/FitnessProgramCard";
import { AddFitnessProgramModalComponent } from "./add-fitness-program-modal/add-fitness-program-modal.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-fitness-programs-list',
  templateUrl: './fitness-programs-list.component.html',
  styleUrls: ['./fitness-programs-list.component.scss']
})
export class FitnessProgramsList implements OnInit, OnDestroy {

  fitnessProgramCards: FitnessProgramCard[] = [];
  categories: Category[] = [];
  filterForm: FormGroup;
  isLoading = true;
  categoriesLoading = true;
  subs = new Subscription();
  pageSizeOptions: any;
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;

  constructor(private _fitnessProgramService: FitnessProgramService,
              private _categoryService: CategoryService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subs.add(this._categoryService.getAll().subscribe(res => {
      this.categories = res;
      this.categoriesLoading = false;
      this.buildFilterForm();
      this.displayCards();
    }));
  }

  onFilterClick() {
    this.pageIndex = 0;
    this.displayCards();
  }

  displayCards(): void {
    this.isLoading = true;

    const keyword = this.filterForm.get('search').value;
    const categoryId = this.filterForm.get('category').value;

    this.subs.add(this._fitnessProgramService.search(keyword, categoryId, this.pageIndex, this.pageSize).subscribe(res => {
      this.fitnessProgramCards = res.fitnessPrograms;
      this.totalItems = res.totalElements;
      this.isLoading = false;
    }));
  }

  buildFilterForm() {
    this.filterForm = new FormGroup({
      category: new FormControl(''),
      search: new FormControl('')
    });
  }

  onPageChange(event: { pageIndex: number; }): void {
    this.pageIndex = event.pageIndex;
    this.displayCards();
  }

  onAddNewFitnessProgramClick() {
    this.dialog.open(AddFitnessProgramModalComponent, {
      data: {
        title: "Delete comment",
        text: "Are you sure that you want to delete this comment?"
      }
    }).afterClosed().pipe(switchMap(result => {
      if (result) {
        //TODO: http call to save fitness program
        return EMPTY;
      } else {
        return EMPTY
      }
    })).subscribe(res => {
      console.log(res);
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
