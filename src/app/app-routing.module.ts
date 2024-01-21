import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseListComponent } from "./components/exercise-list/exercise-list.component";

const routes: Routes = [{
  path: "",
  component: ExerciseListComponent
},
  {
    path: "exercises",
    component: ExerciseListComponent
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
