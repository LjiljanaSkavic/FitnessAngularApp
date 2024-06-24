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
import { LoginCardModalComponent } from './components/login-card-modal/login-card-modal.component';
import { MatCardModule } from "@angular/material/card";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSidenavModule } from "@angular/material/sidenav";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSelectModule } from "@angular/material/select";
import { ActivationCardModalComponent } from './components/activation-card-modal/activation-card-modal.component';
import { ActivateComponent } from './components/activate/activate.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ProfileDetailsModalComponent } from './components/profile-details-modal/profile-details-modal.component';
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
import { ManagePasswordModalComponent } from './components/manage-password-modal/manage-password-modal.component';
import {
  PurchaseFitnessProgramModalComponent
} from './components/purchase-fitness-program-modal/purchase-fitness-program-modal.component';
import { CommentComponent } from './components/comment/comment.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { DatePipe, NgOptimizedImage } from "@angular/common";
import { FitnessPurchasesListComponent } from './components/fitness-purchases-list/fitness-purchases-list.component';
import {
  FitnessProgramPurchaseCardComponent
} from './components/fitness-purchases-list/fitness-program-purchase-card/fitness-program-purchase-card.component';
import { PaymentTypePipe } from "./pipes/payment-type.pipe";
import {
  FitnessProgramModalComponent
} from './components/fitness-programs-list/fitness-program-modal/fitness-program-modal.component';
import { AdviceMessageModalComponent } from './components/advice-message-modal/advice-message-modal.component';
import { ActivityLogsListComponent } from './components/activity-logs-list/activity-logs-list.component';
import {
  ActivityLogDetailsComponent
} from './components/activity-logs-list/activity-log-details/activity-log-details.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import {
  ActivityLogModalComponent
} from './components/activity-logs-list/activity-log-modal/activity-log-modal.component';
import { MatTableModule } from "@angular/material/table";
import { StatisticsComponent } from './components/statistics/statistics.component';
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
import {
  SubscribeToCategoryModalComponent
} from './components/subscribe-to-category-modal/subscribe-to-category-modal.component';
import { MatSliderModule } from "@angular/material/slider";
import { NoDataComponent } from './components/no-data/no-data.component';
import { MatBadgeModule } from "@angular/material/badge";
import { ExerciseDetailsComponent } from './components/exercise-list/exercise-details/exercise-details.component';
import { MatFormFieldModule } from "@angular/material/form-field";

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
  MatTableModule,
  MatSliderModule,
  MatBadgeModule,
  MatFormFieldModule
]

@NgModule({
  declarations: [
    AppComponent,
    ExerciseCardComponent,
    ExerciseListComponent,
    LoginCardModalComponent,
    ActivationCardModalComponent,
    ActivateComponent,
    ProfileDetailsModalComponent,
    SignUpComponent,
    FitnessProgramsList,
    FitnessProgramPreviewCardComponent,
    FitnessProgramDetailsComponent,
    ManagePasswordModalComponent,
    PurchaseFitnessProgramModalComponent,
    CommentComponent,
    ConfirmationModalComponent,
    FitnessPurchasesListComponent,
    FitnessProgramPurchaseCardComponent,
    PaymentTypePipe,
    FitnessProgramModalComponent,
    AdviceMessageModalComponent,
    ActivityLogsListComponent,
    ActivityLogDetailsComponent,
    ActivityLogModalComponent,
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
    DifficultyLevelPipe,
    SubscribeToCategoryModalComponent,
    NoDataComponent,
    ExerciseDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    ANGULAR_MATERIAL_MODULES
  ],
  providers: [HttpClient, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
