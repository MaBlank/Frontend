import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {MainObject} from "./MainObject";

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private apiURL = 'http://localhost:8080/api/projects';
  projectCreated = new Subject<void>();

  constructor(private http: HttpClient) { }

  getProjects(): Observable<MainObject[]> {
    return this.http.get<MainObject[]>(this.apiURL);
  }

  notifyProjectCreation() {
    this.projectCreated.next();
  }
}
