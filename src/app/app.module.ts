import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAnnotateTextModule } from "ngx-annotate-text";
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from "@angular/material/icon";
import { AnnotationPageComponent } from './annotation-page/annotation-page.component';
import { ProjectListPageComponent } from './project-list-page/project-list-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AnnotationPageComponent
  ],
  imports: [
    BrowserModule,
    ProjectListPageComponent,
    BrowserAnimationsModule,
    NgxAnnotateTextModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
