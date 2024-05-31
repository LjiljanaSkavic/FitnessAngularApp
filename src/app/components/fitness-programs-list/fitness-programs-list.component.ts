import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FitnessProgramService } from "../../services/fitness-program.service";
import { CategoryService } from "../../services/category.service";
import { Category } from "../../models/dto/Category";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { FitnessProgramCard } from "../../models/FitnessProgramCard";
import { FitnessProgramModalComponent } from "./add-fitness-program-modal/fitness-program-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { snackBarConfig } from "../../shared/contants";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { UserStoreService } from "../../services/user-store.service";

const SHOW_PROGRAMS = {
  ALL: 'all',
  MY_PROGRAMS: 'myPrograms'
}

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
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  userId: number;
  myProgramsFilterOn = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _fitnessProgramService: FitnessProgramService,
              private _categoryService: CategoryService,
              public dialog: MatDialog,
              private _router: Router,
              private _snackBar: MatSnackBar,
              private _userStoreService: UserStoreService) {
  }

  ngOnInit(): void {
    this.subs.add(this._categoryService.getAll().subscribe(res => {
      this.categories = res;
      this.categoriesLoading = false;
      this.buildFilterForm();
      this.displayCards();
      this.addShowProgramsAndStatusSubscriptions();
    }));
    if (this._userStoreService.getIsLoggedIn()) {
      this.userId = this._userStoreService.getLoggedInUser().id;
    }

  }

  addShowProgramsAndStatusSubscriptions(): void {
    this.filterForm.get('showPrograms').valueChanges.subscribe(res => {
      this.myProgramsFilterOn = res === 'myPrograms';
    });
    // this.filterForm.get('status').valueChanges.subscribe(res => {
    //
    // });
  }

  onFilterClick() {
    this.pageIndex = 0;
    this.displayCards();
  }

  onResetFiltersClick(): void {
    this.pageIndex = 0;
    this.buildFilterForm();
    this.displayCards();
  }

  displayCards(): void {
    this.isLoading = true;

    const keyword = this.filterForm.get('search').value;
    const categoryId = this.filterForm.get('category').value;
    const showPrograms = this.filterForm.get('showPrograms').value;
    let status = this.filterForm.get('status').value;
    let isCompleted = false;
    if (this.myProgramsFilterOn) {
      isCompleted = status === 1;
      console.log(isCompleted);
    }

    this.subs.add(this._fitnessProgramService.search(keyword,
      categoryId,
      showPrograms === SHOW_PROGRAMS.ALL ? null : this.userId,
      isCompleted,
      this.pageIndex,
      this.pageSize).subscribe(res => {
      this.fitnessProgramCards = res.fitnessPrograms;
      this.totalItems = res.totalElements;
      this.isLoading = false;
    }));
  }

  buildFilterForm(): void {
    this.filterForm = new FormGroup({
      category: new FormControl(0),
      search: new FormControl(''),
      showPrograms: new FormControl(SHOW_PROGRAMS.ALL),
      status: new FormControl(0),
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.displayCards();
  }

  onAddNewFitnessProgramClick(): void {
    this.dialog.open(FitnessProgramModalComponent, {
      hasBackdrop: true,
      backdropClass: 'fitness-app-backdrop'
    }).afterClosed().subscribe(result => {
      if (result) {
        //TODO: http call to save fitness program
        this._snackBar.open("Fitness program successfully added.", "OK", snackBarConfig)
        this._router.navigateByUrl(`fitness-program/${result.id}`).catch(err => console.log(err));
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
