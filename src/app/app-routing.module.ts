import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseListComponent } from "./components/exercise-list/exercise-list.component";
import { LoginCardComponent } from "./components/login-card/login-card.component";
import { ActivationCardComponent } from "./components/activation-card/activation-card.component";
import { ActivateComponent } from "./components/activate/activate.component";
import { ProfileDetailsComponent } from "./components/profile-details/profile-details.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { FitnessProgramsList } from "./components/fitness-programs-list/fitness-programs-list.component";
import {
    FitnessProgramDetailsComponent
} from "./components/fitness-programs-list/fitness-program-details/fitness-program-details.component";
import { ManagePasswordComponent } from "./components/manage-password/manage-password.component";
import { FitnessPurchasesListComponent } from "./components/fitness-purchases-list/fitness-purchases-list.component";
import { ActivityLogsListComponent } from "./components/activity-logs-list/activity-logs-list.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { RssFeedNewsListComponent } from "./components/news-list/rss-feed-news-list.component";

const routes: Routes = [
    {
        path: "",
        component: RssFeedNewsListComponent
    },
    {
        path: "news",
        component: RssFeedNewsListComponent
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
        path: "profile-activation/:id",
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
    {
        path: "fitness-program",
        component: FitnessProgramsList
    },
    {
        path: "fitness-program/:id",
        component: FitnessProgramDetailsComponent
    },
    {
        path: "manage-password/:id",
        component: ManagePasswordComponent
    },
    {
        path: "fitness-program-purchases/:id",
        component: FitnessPurchasesListComponent
    },
    {
        path: "activity-logs",
        component: ActivityLogsListComponent
    },
    {
        path: "statistics",
        component: StatisticsComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
