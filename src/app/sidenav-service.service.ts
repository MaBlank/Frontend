import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenavOpenSource = new BehaviorSubject(false);
  sidenavOpen$ = this.sidenavOpenSource.asObservable();

  toggleSidenav() {
    this.sidenavOpenSource.next(!this.sidenavOpenSource.value);
  }
}
