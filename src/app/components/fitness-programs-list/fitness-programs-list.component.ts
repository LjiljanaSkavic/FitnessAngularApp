import { Component, OnDestroy, OnInit } from '@angular/core';
import { FitnessProgramService } from "../../services/fitness-program.service";
import { FitnessProgram } from "../../models/FitnessProgram";

@Component({
  selector: 'app-fitness-programs-list',
  templateUrl: './fitness-programs-list.component.html',
  styleUrls: ['./fitness-programs-list.component.scss']
})
export class FitnessProgramsList implements OnInit, OnDestroy {

  fitnessPrograms: FitnessProgram[] = [];
  isLoading = true;

  constructor(private _fitnessProgramService: FitnessProgramService) {
  }

  ngOnInit(): void {
    this._fitnessProgramService.getAll().subscribe(res => {
      this.fitnessPrograms = res;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
  }
}
