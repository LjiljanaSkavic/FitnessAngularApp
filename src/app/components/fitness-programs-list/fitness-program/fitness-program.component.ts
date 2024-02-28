import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FitnessProgram } from "../../../models/FitnessProgram";

@Component({
  selector: 'app-fitness-program',
  templateUrl: './fitness-program.component.html',
  styleUrls: ['./fitness-program.component.scss']
})
export class FitnessProgramComponent implements OnInit, OnDestroy {

  @Input() fitnessProgram: FitnessProgram = {} as FitnessProgram;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
