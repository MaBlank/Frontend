import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAnnotateTextModule } from "ngx-annotate-text";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { ProjectNewComponent } from './project-new/project-new.component';
import { UniqueButtonPipe } from './unique-button.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AnnotationPageComponent,
    ProjectListPageComponent,
    ProjectNewComponent,
    UniqueButtonPipe,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxAnnotateTextModule,
    FormsModule,
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
    ReactiveFormsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
