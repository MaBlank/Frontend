import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAnnotateTextModule } from "ngx-annotate-text";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  // Import FormsModule
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from "@angular/material/icon";
import { AnnotationPageComponent } from './annotation-page/annotation-page.component';
import { ProjectListPageComponent } from './project-list-page/project-list-page.component';
import {AppRoutingModule} from "../app-routing.module";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AnnotationPageComponent,
    ProjectListPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxAnnotateTextModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    HttpClientModule,
    MatIconModule,
    AppRoutingModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
