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

export const ANGULAR_MATERIAL_MODULES = [
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule
]

@NgModule({
  declarations: [
    AppComponent,
    ExerciseCardComponent,
    ExerciseListComponent,
    LoginCardComponent,
  ],
  imports: [
    BrowserModule,
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
