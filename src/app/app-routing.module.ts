import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseListComponent } from "./components/exercise-list/exercise-list.component";
import { LoginCardComponent } from "./components/login-card/login-card.component";

const routes: Routes = [
  {
    path: "",
    component: ExerciseListComponent
  },
  {
    path: "exercises",
    component: ExerciseListComponent
  },
  {
    path: "login",
    component: LoginCardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
