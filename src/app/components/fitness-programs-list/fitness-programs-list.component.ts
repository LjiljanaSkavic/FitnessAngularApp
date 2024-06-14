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
import { DIFFICULTY_LEVELS } from "../../constants/difficulty-levels";
import { animate, state, style, transition, trigger } from "@angular/animations";

const SHOW_PROGRAMS = {
  ALL: 'all',
  MY_PROGRAMS: 'myPrograms'
}

@Component({
  selector: 'app-fitness-programs-list',
  templateUrl: './fitness-programs-list.component.html',
  styleUrls: ['./fitness-programs-list.component.scss'],
  animations: [
    trigger('filterAnimation', [
      state('hidden', style({
        transform: 'scaleY(0)',
        opacity: 0,
        transformOrigin: 'top'
      })),
      state('visible', style({
        transform: 'scaleY(1)',
        opacity: 1,
        transformOrigin: 'top'
      })),
      transition('hidden <=> visible', [
        animate('0.4s ease-in-out')
      ])
    ])
  ]
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
  filtersVisible: boolean = false;
  difficultyLevels = DIFFICULTY_LEVELS;

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
  }

  toggleFilters(): void {
    this.filtersVisible = !this.filtersVisible;
  }

  onFilterClick(): void {
    this.pageIndex = 0;
    this.displayCards();
    this.filtersVisible = false;
  }

  onResetFiltersClick(): void {
    this.pageIndex = 0;
    this.buildFilterForm();
    this.displayCards();
    this.filtersVisible = false;
  }

  displayCards(): void {
    this.isLoading = true;

    const keyword = this.filterForm.get('search').value;
    const categoryId = this.filterForm.get('category').value;
    const showPrograms = this.filterForm.get('showPrograms').value;
    let status = this.filterForm.get('status').value;
    let isCompleted = false;
    const minPrice = this.filterForm.get('minPrice').value;
    const maxPrice = this.filterForm.get('maxPrice').value;
    if (this.myProgramsFilterOn) {
      isCompleted = status === 1;
    }
    const difficultyLevel = this.filterForm.get('difficultyLevel').value;

    this.subs.add(this._fitnessProgramService.search(keyword,
      categoryId,
      showPrograms === SHOW_PROGRAMS.ALL ? null : this.userId,
      isCompleted,
      difficultyLevel,
      minPrice,
      maxPrice,
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
      difficultyLevel: new FormControl(0),
      minPrice: new FormControl(0),
      maxPrice: new FormControl(100),
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
