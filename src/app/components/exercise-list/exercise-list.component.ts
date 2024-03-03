import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExercisesService } from "../../services/exercises.service";
import { Subscription } from "rxjs";
import { Exercise } from "../../models/Exercise";

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  exercises: Exercise[] = [];
  pagedExercises: Exercise[] = [];
  isLoading = false;
  pageSizeOptions: any;
  pageSize = 10;

  constructor(private _exercisesService: ExercisesService,) {
  }

  ngOnInit(): void {
    this.subs.add(this._exercisesService.getExercises().subscribe(res => {
      this.exercises = res;
      this.pagedExercises = res;
    }));
  }

  onPageChange(event: { pageIndex: number; }): void {
    this.displayPage(event.pageIndex);
  }

  displayPage(pageIndex: number): void {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedExercises = this.exercises.slice(startIndex, endIndex);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
