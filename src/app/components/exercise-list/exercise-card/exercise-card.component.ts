import { Component, Input } from '@angular/core';
import { Exercise } from "../../../models/exercise";
import { Router } from "@angular/router";

@Component({
    selector: 'app-exercise-card',
    templateUrl: './exercise-card.component.html',
    styleUrls: ['./exercise-card.component.scss']
})
export class ExerciseCardComponent {

    @Input() exercise: Exercise = {} as Exercise;
    @Input() isCard = true;

    constructor(private _router: Router) {
    }

    openExerciseDetails() {
        const url = this._router.serializeUrl(
            this._router.createUrlTree(['/exercise-details'], {
                queryParams: {
                    name: encodeURIComponent(this.exercise.name),
                    difficulty: encodeURIComponent(this.exercise.difficulty),
                    instructions: encodeURIComponent(this.exercise.instructions)
                }
            }));
        window.open(url, '_blank');
    }
}
