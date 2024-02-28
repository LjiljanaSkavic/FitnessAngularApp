import { Component, OnDestroy, OnInit } from '@angular/core';
import { FitnessProgramService } from "../../services/fitness-program.service";
import { FitnessProgram } from "../../models/FitnessProgram";
import { CategoryService } from "../../services/category.service";

@Component({
  selector: 'app-fitness-programs-list',
  templateUrl: './fitness-programs-list.component.html',
  styleUrls: ['./fitness-programs-list.component.scss']
})
export class FitnessProgramsList implements OnInit, OnDestroy {

  fitnessPrograms: FitnessProgram[] = [];
  isLoading = true;

  constructor(private _fitnessProgramService: FitnessProgramService,
              private _categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this._categoryService.getAll().subscribe(res => {
      console.log(res);
    })

    this._fitnessProgramService.getAll().subscribe(res => {
      this.fitnessPrograms = res;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
  }
}
