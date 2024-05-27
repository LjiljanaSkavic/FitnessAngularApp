import { Component, Input } from '@angular/core';
import { Exercise } from "../../../models/Exercise";

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss']
})
export class ExerciseCardComponent {

  @Input() exercise: Exercise = {} as Exercise;

  constructor() {
  }
}
