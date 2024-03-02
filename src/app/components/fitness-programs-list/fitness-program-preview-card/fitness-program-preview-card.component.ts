import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { FitnessProgramCard } from "../../../models/FitnessProgramCard";

@Component({
  selector: 'app-fitness-program-preview-card',
  templateUrl: './fitness-program-preview-card.component.html',
  styleUrls: ['./fitness-program-preview-card.component.scss']
})
export class FitnessProgramPreviewCardComponent {

  @Input() fitnessProgramCard: FitnessProgramCard = {} as FitnessProgramCard;

  constructor(private _router: Router) {
  }

  onFitnessProgramCardClick() {
    this._router.navigateByUrl(`fitness-program/${this.fitnessProgramCard.id}`);
  }
}
