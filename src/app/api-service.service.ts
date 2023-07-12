import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MainObject} from "./MainObject";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiURL = 'http://localhost:8080/api/projects';
  constructor(private http: HttpClient) { }
  getProjects(): Observable<MainObject[]> {
    return this.http.get<MainObject[]>(this.apiURL);
  }
}
