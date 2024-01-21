import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

export const ANGULAR_MATERIAL_MODULES = [MatIconModule, MatButtonModule, MatInputModule,
  MatToolbarModule]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ANGULAR_MATERIAL_MODULES,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
