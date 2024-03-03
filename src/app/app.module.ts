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
  MatPaginatorModule
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ANGULAR_MATERIAL_MODULES,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
