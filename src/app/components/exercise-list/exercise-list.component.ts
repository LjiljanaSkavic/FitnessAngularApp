import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ExercisesService } from "../../services/exercises.service";
import { Subscription } from "rxjs";
import { Exercise } from "../../models/Exercise";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  exercises: Exercise[] = [];
  pagedExercises: Exercise[] = [];
  isLoading = true;
  pageSizeOptions: any;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _exercisesService: ExercisesService,) {
  }

  ngOnInit(): void {
    this.subs.add(this._exercisesService.getExercises().subscribe(res => {
      this.exercises = res;
      this.displayPage(0);
      this.isLoading = false;
    }));
  }

  onPageChange(event: any): void {
    this.displayPage(event.pageIndex);
  }

  displayPage(currentPageIndex: number): void {
    const startIndex = currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedExercises = this.exercises.slice(startIndex, endIndex);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
