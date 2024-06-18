import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from "../../../models/exercise";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-exercise-details',
    templateUrl: './exercise-details.component.html',
    styleUrls: ['./exercise-details.component.scss']
})
export class ExerciseDetailsComponent implements OnInit {
    @Input() exercise: Exercise;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const name = this.route.snapshot.queryParamMap.get('name');
        const difficulty = this.route.snapshot.queryParamMap.get('difficulty');
        const instructions = this.route.snapshot.queryParamMap.get('instructions');

        if (name && difficulty && instructions) {
            this.exercise = {
                name: decodeURIComponent(name),
                difficulty: decodeURIComponent(difficulty),
                instructions: decodeURIComponent(instructions)
            };
        }
    }
}
