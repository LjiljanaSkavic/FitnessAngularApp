import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ExerciseCardComponent } from './components/exercise-list/exercise-card/exercise-card.component';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { MatCardModule } from "@angular/material/card";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSidenavModule } from "@angular/material/sidenav";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSelectModule } from "@angular/material/select";
import { ActivationCardComponent } from './components/activation-card/activation-card.component';
import { ActivateComponent } from './components/activate/activate.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MatListModule } from "@angular/material/list";
import { MatTreeModule } from "@angular/material/tree";
import { FitnessProgramsList } from './components/fitness-programs-list/fitness-programs-list.component';
import {
  FitnessProgramPreviewCardComponent
} from './components/fitness-programs-list/fitness-program-preview-card/fitness-program-preview-card.component';
import {
  FitnessProgramDetailsComponent
} from './components/fitness-programs-list/fitness-program-details/fitness-program-details.component';
import { MatRadioModule } from "@angular/material/radio";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ManagePasswordComponent } from './components/manage-password/manage-password.component';
import { BuyProgramComponent } from './components/buy-program/buy-program.component';
import { CommentComponent } from './components/comment/comment.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { NgOptimizedImage } from "@angular/common";
import { FitnessPurchasesListComponent } from './components/fitness-purchases-list/fitness-purchases-list.component';
import {
  FitnessProgramPurchaseCardComponent
} from './components/fitness-purchases-list/fitness-program-purchase-card/fitness-program-purchase-card.component';
import { PaymentTypePipe } from "./pipes/payment-type.pipe";
import {
  FitnessProgramModalComponent
} from './components/fitness-programs-list/add-fitness-program-modal/fitness-program-modal.component';
import { AdviceMessageModalComponent } from './components/advice-message-modal/advice-message-modal.component';
import { ActivityLogsListComponent } from './components/activity-logs-list/activity-logs-list.component';
import {
  ActivityLogDetailsComponent
} from './components/activity-logs-list/activity-log-details/activity-log-details.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import {
  AddActivityLogModalComponent
} from './components/activity-logs-list/add-activity-log-modal/add-activity-log-modal.component';
import { AtivityLogCardComponent } from './components/ativity-log-card/ativity-log-card.component';
import { MatTableModule } from "@angular/material/table";
import { StatisticsComponent } from './components/statistics/statistics.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { RssFeedNewsListComponent } from './components/news-list/rss-feed-news-list.component';
import { RssFeedNewsItemComponent } from './components/news-list/rss-feed-news-item/rss-feed-news-item.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ChatComponent } from './components/chat/chat.component';
import { UserListComponent } from './components/chat/user-list/user-list.component';
import { MessagesComponent } from './components/chat/messages/messages.component';
import { ChatMessageComponent } from './components/chat/chat-message/chat-message.component';
import { TruncatePipe } from "./pipes/truncate.pipe";
import { ActivityLogTypePipe } from "./pipes/activity-log-type.pipe";
import { DifficultyLevelPipe } from "./pipes/difficulty-level.pipe";

export const ANGULAR_MATERIAL_MODULES = [
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatDialogModule,
  MatSidenavModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatListModule,
  MatTreeModule,
  MatRadioModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
]

@NgModule({
  declarations: [
    AppComponent,
    ExerciseCardComponent,
    ExerciseListComponent,
    LoginCardComponent,
    ActivationCardComponent,
    ActivateComponent,
    ProfileDetailsComponent,
    SignUpComponent,
    FitnessProgramsList,
    FitnessProgramPreviewCardComponent,
    FitnessProgramDetailsComponent,
    ManagePasswordComponent,
    BuyProgramComponent,
    CommentComponent,
    ConfirmationModalComponent,
    FitnessPurchasesListComponent,
    FitnessProgramPurchaseCardComponent,
    PaymentTypePipe,
    FitnessProgramModalComponent,
    AdviceMessageModalComponent,
    ActivityLogsListComponent,
    ActivityLogDetailsComponent,
    AddActivityLogModalComponent,
    AtivityLogCardComponent,
    StatisticsComponent,
    RssFeedNewsListComponent,
    RssFeedNewsItemComponent,
    CarouselComponent,
    LoaderComponent,
    ChatComponent,
    UserListComponent,
    MessagesComponent,
    ChatMessageComponent,
    TruncatePipe,
    ActivityLogTypePipe,
    DifficultyLevelPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ANGULAR_MATERIAL_MODULES,
    NgOptimizedImage,
    MatTableModule,
    GoogleChartsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
