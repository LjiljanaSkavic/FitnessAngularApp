import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExercisesService } from "../../services/exercises.service";
import { Subscription } from "rxjs";
import { Exercise } from "../../models/exercise";

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  exercises: Exercise[] = [];

  constructor(private _exercisesService: ExercisesService,) {
  }

  ngOnInit(): void {
    this.subs.add(this._exercisesService.getExercises().subscribe(res => {
      this.exercises = res;
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
