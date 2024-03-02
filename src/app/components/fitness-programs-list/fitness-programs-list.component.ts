import { Component, OnDestroy, OnInit } from '@angular/core';
import { FitnessProgramService } from "../../services/fitness-program.service";
import { CategoryService } from "../../services/category.service";
import { Category } from "../../models/dto/Category";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { FitnessProgramCard } from "../../models/FitnessProgramCard";

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

  constructor(private _fitnessProgramService: FitnessProgramService,
              private _categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.subs.add(this._categoryService.getAll().subscribe(res => {
      this.categories = res;
      this.categoriesLoading = false;
      this.buildCategoriesForm();
      this.addSubscriptions();
    }));

    this.subs.add(this._fitnessProgramService.getAll().subscribe(res => {
      this.fitnessProgramCards = res;
      this.isLoading = false;
    }));
  }

  buildCategoriesForm() {
    this.filterForm = new FormGroup({
      category: new FormControl(this.categories),
      search: new FormControl('')
    });
  }

  addSubscriptions() {
    this.subs.add(this.filterForm.get('category').valueChanges.subscribe((selectedCategoryId) => {
      console.log('Selected category ID:', selectedCategoryId);
    }));
    this.subs.add(this.filterForm.get('search').valueChanges.subscribe((searchTerm) => {
      console.log(searchTerm);
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
