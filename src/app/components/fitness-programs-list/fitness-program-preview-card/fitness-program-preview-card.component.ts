import { Component, Input } from '@angular/core';
import { FitnessProgram } from "../../../models/FitnessProgram";
import { Router } from "@angular/router";

@Component({
  selector: 'app-fitness-program-preview-card',
  templateUrl: './fitness-program-preview-card.component.html',
  styleUrls: ['./fitness-program-preview-card.component.scss']
})
export class FitnessProgramPreviewCardComponent {

  @Input() fitnessProgram: FitnessProgram = {} as FitnessProgram;

  constructor(private _router: Router) {
  }

  onFitnessProgramClick() {
    this._router.navigateByUrl(`fitness-program/${this.fitnessProgram.id}`);
  }
}
