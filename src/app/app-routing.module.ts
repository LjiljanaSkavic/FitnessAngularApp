import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseListComponent } from "./components/exercise-list/exercise-list.component";
import { ActivationCardComponent } from "./components/activation-card/activation-card.component";
import { ActivateComponent } from "./components/activate/activate.component";
import { ProfileDetailsComponent } from "./components/profile-details/profile-details.component";
import { FitnessProgramsList } from "./components/fitness-programs-list/fitness-programs-list.component";
import {
    FitnessProgramDetailsComponent
} from "./components/fitness-programs-list/fitness-program-details/fitness-program-details.component";
import { FitnessPurchasesListComponent } from "./components/fitness-purchases-list/fitness-purchases-list.component";
import { ActivityLogsListComponent } from "./components/activity-logs-list/activity-logs-list.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { RssFeedNewsListComponent } from "./components/news-list/rss-feed-news-list.component";
import { ChatComponent } from "./components/chat/chat.component";

const routes: Routes = [
    {
        path: '',
        component: RssFeedNewsListComponent,
        pathMatch: 'full'
    },
    {
        path: "fitness-news",
        component: RssFeedNewsListComponent
    },
    {
        path: "exercises",
        component: ExerciseListComponent
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
        path: "fitness-program",
        component: FitnessProgramsList
    },
    {
        path: "fitness-program/:id",
        component: FitnessProgramDetailsComponent
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
        path: "chat",
        component: ChatComponent
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
