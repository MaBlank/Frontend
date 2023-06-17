import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AnnotationPageComponent} from "./app/annotation-page/annotation-page.component";
import {ProjectListPageComponent} from "./app/project-list-page/project-list-page.component";


const routes: Routes = [
  { path: '', redirectTo: 'annotation', pathMatch: 'full' },
  { path: 'annotation', component: AnnotationPageComponent },
  { path: 'project-list', component: ProjectListPageComponent },
  // Add any additional routes or path configurations here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
