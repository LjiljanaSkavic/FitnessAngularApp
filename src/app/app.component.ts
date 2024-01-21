import { Component, OnInit } from '@angular/core';
import { ExercisesService } from "./services/exercises.service";
import { FeedService } from "./services/feed.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FitnessAngularApp';

  constructor(private _exercisesService: ExercisesService,
              private _rssFeed: FeedService) {
  }

  ngOnInit(): void {
    // this._rssFeed.getRssFeed().subscribe(res => console.log(res));
    this._exercisesService.getExercises().subscribe(res => console.log(res));
  }

  onToggleAccountMenuClick() {

  }

  onFitnessAppClick() {

  }
}
