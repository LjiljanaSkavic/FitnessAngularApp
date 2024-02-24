import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseListComponent } from "./components/exercise-list/exercise-list.component";
import { LoginCardComponent } from "./components/login-card/login-card.component";
import { ActivationCardComponent } from "./components/activation-card/activation-card.component";
import { ActivateComponent } from "./components/activate/activate.component";
import { ProfileDetailsComponent } from "./components/profile-details/profile-details.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";

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
  {
    path: "profile-activation",
    component: ActivationCardComponent
  },
  {
    path: "activate",
    component: ActivateComponent
  },
  {
    path: "profile-details/:id",
    component: ProfileDetailsComponent
  },
  {
    path: "sign-up",
    component: SignUpComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
